### Circuit Breaker

When a user tries to withdraw (claim) rewards and the contract doesn't hold enough ETH - although the user theoretically has enough claimable rewards saved in the `openRewardsInWei` mapping - `isEmergencyMode` will be set to `true`. Users won't be able to create or buy cards until the contract owner disables the emergency mode by calling `stopEmergencyMode`.

### Withdrawal Pattern

Rewards have to be claimed by calling `claimRewards()` manually, it does not happen automatically. If the contract would transfer the rewards automatically within the `buyCard()` function, it would always fail if the rewards were sent to a malicious contract address that (for instance) just calls `revert()` or consumes more than 2300 gas within its fallback function.

### Guard Check

To validate user input, the contract makes use of `require()` checks that revert a contract call when they evaluate to `false`. `require()` is shorter and easier to read compared to if-else statements that would throw an error.
