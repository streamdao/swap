# StreamSwap - Alpha Version

[![License](https://img.shields.io/crates/l/stream-swap-anchor)](https://github.com/streamdao/stream-swap/blob/master/LICENSE)
[![Build Status](https://img.shields.io/github/workflow/status/streamdao/stream-swap/Program/master)](https://github.com/streamdao/stream-swap/actions/workflows/program.yml?query=branch%3Amaster)
[![Contributors](https://img.shields.io/github/contributors/streamdao/stream-swap)](https://github.com/streamdao/stream-swap/graphs/contributors)

<div align="center">
    <img src="/assets/banner.png" />
</div>

<div align="center">
    An automated market maker for mean-reverting trading pairs.
</div>

## Documentation

Detailed information on how to build on Stream Protocol can be found on the [StreamSwap developer documentation website](https://docs.streamprotocol.org/docs/swap/developing/overview).

Automatically generated documentation for Rust Crates is available below.

## Rust Crates

| Package              | Description                                                                          | Version                                                                                                         | Docs                                                                                           |
| :------------------- | :----------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| `stream-swap`        | StreamSwap program.                                                            | [![crates](https://img.shields.io/crates/v/stream-swap)](https://crates.io/crates/stream-swap)                  | [![Docs.rs](https://docs.rs/stream-swap/badge.svg)](https://docs.rs/stream-swap)               |
| `stream-swap-anchor` | Anchor bindings for the StreamSwap Rust client.                                      | [![Crates.io](https://img.shields.io/crates/v/stream-swap-anchor)](https://crates.io/crates/stream-swap-anchor) | [![Docs.rs](https://docs.rs/stream-swap-anchor/badge.svg)](https://docs.rs/stream-swap-anchor) |
| `stream-swap-client` | StreamSwap Rust client.                                                              | [![crates](https://img.shields.io/crates/v/stream-swap-client)](https://crates.io/crates/stream-swap-client)    | [![Docs.rs](https://docs.rs/stream-swap-client/badge.svg)](https://docs.rs/stream-swap-client) |
| `stream-swap-fuzz`   | Fuzz tests for the StreamSwap program.                                         | [![crates](https://img.shields.io/crates/v/stream-swap-fuzz)](https://crates.io/crates/stream-swap-fuzz)        | [![Docs.rs](https://docs.rs/stream-swap-fuzz/badge.svg)](https://docs.rs/stream-swap-fuzz)     |
| `stream-swap-math`   | Calculations for the StreamSwap invariant                                            | [![crates](https://img.shields.io/crates/v/stream-swap-math)](https://crates.io/crates/stream-swap-math)        | [![Docs.rs](https://docs.rs/stream-swap-math/badge.svg)](https://docs.rs/stream-swap-math)     |
| `stream-swap-sim`    | Simulations of the StreamSwap invariant compared to Curve's reference implementation | [![crates](https://img.shields.io/crates/v/stream-swap-sim)](https://crates.io/crates/stream-swap-sim)          | [![Docs.rs](https://docs.rs/stream-swap-sim/badge.svg)](https://docs.rs/stream-swap-sim)       |

## JavaScript/Web3.js

To use StreamSwap with your frontend or Node.js project, use [the JavaScript SDK.](https://github.com/streamdao/stream-common/tree/master/packages/streamswap-sdk)

## Audit

Stream Protocol's [stream-swap-program](https://github.com/streamdao/stream-swap/tree/master/stream-swap-program) has been audited by [Bramah Systems](https://www.bramah.systems/). View the audit report [here](https://github.com/streamdao/stream-swap/blob/master/audit/bramah-systems.pdf).

## Developing

### Tests

To run the tests, run:

```
./stream-swap-program/do.sh e2e-test
```

## Archive

The original SaberSwap program can be found on the [archive branch](https://github.com/streamdao/stream-swap/tree/archive).

## License

StreamSwap is licensed under the Apache License, Version 2.0.
