# `Stream Swap Fuzz`

Fuzz tests for the Stream Protocol´s StreamSwap program.

## Running

If you are using a recent nightly version, use the following command:

```
RUSTFLAGS="-Znew-llvm-pass-manager=no" cargo fuzz run --dev fuzz_test
```

## Documentation

Detailed information on how to build on Stream Protocol can be found on the [StreamSwap developer documentation website](https://docs.streamprotocol.org/docs/swap/developing/overview).

## License

StreamSwap is licensed under the Apache License, Version 2.0.
