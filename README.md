# Google Code Jam

Problems from Google Code Jam, each in the homonym directory:

* oversized-pancake-flipper: [specs](https://code.google.com/codejam/contest/3264486/dashboard#s=p0&a=4)
* tidy-numbers: [specs](https://code.google.com/codejam/contest/3264486/dashboard#s=p1&a=4)
* bathroom-stalls: [specs](https://code.google.com/codejam/contest/3264486/dashboard#s=p2&a=4)

## Testing

To get the output (to be uploaded to problem's page) from the respective input file, execute the `yarn start` script, with the name of the source directory; e.g. for `tidy-numbers`:

```
yarn start oversized-pancake-flipper
```

It takes files from `./oversized-pancake-flipper/in` and outputs into `./oversized-pancake-flipper/out`

Note: problem "tidy-numbers" uses a deprecated system (takes data from stdin and outputs to stdout). Use `yarn start tidy-numbers < file.in > file.out`

For development, I've added unit testing with `jest`. Specific tests can be run like this:

```
yarn test bathroom-stalls
```

Or `test:watch` (see npm scripts).
