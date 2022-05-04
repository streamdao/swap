//! Anchor-compatible SDK for the StreamSwap program.
#![deny(missing_docs)]
#![deny(rustdoc::all)]
#![allow(rustdoc::missing_doc_code_examples)]
#![allow(clippy::nonstandard_macro_braces)]

mod accounts;
mod instructions;
mod state;

pub use accounts::*;
pub use instructions::*;
pub use state::*;

use anchor_lang::prelude::*;

declare_id!("SSwpkEEcbUqx4vtoEByFjSkhKdCT862DNVb52nZg1UZ");

/// The StreamSwap program.
#[derive(Clone)]
pub struct StreamSwap;

impl anchor_lang::AccountDeserialize for StreamSwap {
    fn try_deserialize(buf: &mut &[u8]) -> Result<Self> {
        StreamSwap::try_deserialize_unchecked(buf)
    }

    fn try_deserialize_unchecked(_buf: &mut &[u8]) -> Result<Self> {
        Ok(StreamSwap)
    }
}

impl anchor_lang::Id for StreamSwap {
    fn id() -> Pubkey {
        ID
    }
}
