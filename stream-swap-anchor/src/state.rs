//! State structs for swaps.

use anchor_lang::prelude::*;
use anchor_lang::solana_program::program_pack::Pack;
use std::ops::Deref;

/// StreamSwap account wrapper for Anchor programs.
///
/// *For more info, see [stream_swap_client::state::SwapInfo].*
#[derive(Clone, Copy, Debug, PartialEq)]
pub struct SwapInfo(stream_swap_client::state::SwapInfo);

impl SwapInfo {
    /// The length, in bytes, of the packed representation
    pub const LEN: usize = stream_swap_client::state::SwapInfo::LEN;

    /// Computes the minimum rent exempt balance of a [SwapInfo].
    pub fn minimum_rent_exempt_balance() -> Result<u64> {
        Ok(Rent::get()?.minimum_balance(Self::LEN))
    }
}

impl Owner for SwapInfo {
    fn owner() -> Pubkey {
        crate::ID
    }
}

impl Deref for SwapInfo {
    type Target = stream_swap_client::state::SwapInfo;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl anchor_lang::AccountSerialize for SwapInfo {
    fn try_serialize<W: std::io::Write>(&self, _writer: &mut W) -> Result<()> {
        // no-op
        Ok(())
    }
}

impl anchor_lang::AccountDeserialize for SwapInfo {
    fn try_deserialize(buf: &mut &[u8]) -> Result<Self> {
        SwapInfo::try_deserialize_unchecked(buf)
    }

    fn try_deserialize_unchecked(buf: &mut &[u8]) -> Result<Self> {
        Ok(stream_swap_client::state::SwapInfo::unpack(buf).map(SwapInfo)?)
    }
}
