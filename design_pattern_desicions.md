### Circuit Breaker

When a user tries to withdraw (claim) rewards and the contract doesn't hold enough ETH - although he theoretically has enough claimable rewards saved in the `openRewardsInWei` mapping - `isEmergencyMode` will be set to `true`. Users won't be able to create or buy cards until the contract owner disables the emergency mode by calling `stopEmergencyMode`.
