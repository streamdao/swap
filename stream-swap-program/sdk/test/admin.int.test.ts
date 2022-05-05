import { SignerWallet, TransactionEnvelope } from "@streamprotocol/solana-contrib";
import {
  createAdminApplyNewAdminInstruction,
  createAdminCommitNewAdminInstruction,
  createAdminSetFeeAccountInstruction,
  deployNewSwap,
  StreamSwap,
  SWAP_PROGRAM_ID,
  ZERO_TS,
} from "@streamprotocol/streamswap-sdk";
import { getOrCreateATA, u64 } from "@streamprotocol/token-utils";
import type { Signer, TransactionInstruction } from "@solana/web3.js";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
} from "@solana/web3.js";

import { deployTestTokens } from "./deployTestTokens";
import {
  AMP_FACTOR,
  BOOTSTRAP_TIMEOUT,
  CLUSTER_URL,
  newKeypairWithLamports,
  sendAndConfirmTransactionWithTitle,
} from "./helpers";

describe("admin test", () => {
  // Cluster connection
  let connection: Connection;
  // Fee payer
  let payer: Signer;
  // owner of the user accounts
  let owner: Signer;
  // Stream swap
  let streamSwap: StreamSwap;
  let streamSwapAccount: Keypair;
  let streamSwapProgramId: PublicKey;

  const newAdmin: Keypair = Keypair.generate();

  beforeAll(async () => {
    // Bootstrap Test Environment ...
    connection = new Connection(CLUSTER_URL, "single");
    payer = await newKeypairWithLamports(connection, LAMPORTS_PER_SOL);
    owner = await newKeypairWithLamports(connection, LAMPORTS_PER_SOL);

    const provider = new SignerWallet(payer).createProvider(connection);
    const {
      mintA: tokenAMint,
      mintB: tokenBMint,
      seedPoolAccounts,
    } = await deployTestTokens({
      provider,
      minterSigner: owner,
    });

    streamSwapProgramId = SWAP_PROGRAM_ID;
    streamSwapAccount = Keypair.generate();

    const { swap: newSwap } = await deployNewSwap({
      provider,
      swapProgramID: streamSwapProgramId,
      adminAccount: owner.publicKey,
      tokenAMint,
      tokenBMint,
      ampFactor: new u64(AMP_FACTOR),

      initialLiquidityProvider: owner.publicKey,
      useAssociatedAccountForInitialLP: true,
      seedPoolAccounts,

      swapAccountSigner: streamSwapAccount,
    });

    streamSwap = newSwap;
  }, BOOTSTRAP_TIMEOUT);

  it("Set fee account", async () => {
    const fetchedStreamSwap = await StreamSwap.load(
      connection,
      streamSwapAccount.publicKey,
      streamSwapProgramId
    );

    const provider = new SignerWallet(owner).createProvider(connection);
    const tokenOwner = Keypair.generate();
    const { address: expectedFeeAccount, instruction } = await getOrCreateATA({
      provider,
      mint: fetchedStreamSwap.state.tokenA.mint,
      owner: tokenOwner.publicKey,
    });

    const instructions: TransactionInstruction[] = [];
    if (instruction) {
      instructions.push(instruction);
    }
    instructions.push(
      createAdminSetFeeAccountInstruction({
        config: fetchedStreamSwap.config,
        state: fetchedStreamSwap.state,
        tokenAccount: expectedFeeAccount,
      })
    );
    const txEnv = new TransactionEnvelope(provider, instructions);
    const pendingTx = await txEnv.send();
    await pendingTx.wait();

    const newSwap = await StreamSwap.load(
      connection,
      streamSwap.config.swapAccount,
      streamSwap.config.swapProgramID
    );
    expect(newSwap.state.tokenA.adminFeeAccount).toEqual(expectedFeeAccount);
  });

  it("Commit new admin", async () => {
    const fetchedStreamSwap = await StreamSwap.load(
      connection,
      streamSwapAccount.publicKey,
      streamSwapProgramId
    );

    const txn = new Transaction().add(
      createAdminCommitNewAdminInstruction({
        config: fetchedStreamSwap.config,
        state: fetchedStreamSwap.state,
        newAdminAccount: newAdmin.publicKey,
      })
    );
    await sendAndConfirmTransactionWithTitle(
      "commit new admin",
      connection,
      txn,
      payer,
      owner
    );

    const newSwap = await StreamSwap.load(
      connection,
      streamSwap.config.swapAccount,
      streamSwap.config.swapProgramID
    );
    expect(newSwap.state.adminAccount).toEqual(owner.publicKey);
    expect(newSwap.state.futureAdminAccount).toEqual(newAdmin.publicKey);
    expect(newSwap.state.futureAdminDeadline).not.toEqual(ZERO_TS);
  });

  it("Apply new admin", async () => {
    const fetchedStreamSwap = await StreamSwap.load(
      connection,
      streamSwapAccount.publicKey,
      streamSwapProgramId
    );

    const txn = new Transaction().add(
      createAdminApplyNewAdminInstruction({
        config: fetchedStreamSwap.config,
        state: fetchedStreamSwap.state,
      })
    );
    await sendAndConfirmTransactionWithTitle(
      "commit new admin",
      connection,
      txn,
      payer,
      owner
    );
    const newSwap = await StreamSwap.load(
      connection,
      streamSwap.config.swapAccount,
      streamSwap.config.swapProgramID
    );
    expect(newSwap.state.adminAccount).toEqual(newAdmin.publicKey);
    expect(newSwap.state.futureAdminAccount).toEqual(PublicKey.default);
    expect(newSwap.state.futureAdminDeadline).toEqual(ZERO_TS);
  });
});
