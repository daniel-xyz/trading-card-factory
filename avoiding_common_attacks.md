### Re-Entrancy

To prevent that a malicious contract calls claimRewards() multiple times while the function is being executed (= recursive), `msg.sender.transfer(amount)` is called after `openRewardsInWei[msg.sender]` has been resetted to `0`.

### Overflow

Additions and multiplications are made via the `openzeppelin-solidity/contracts/math/SafeMath.sol` library to avoid integer overflows. If an overflow happens, the contract call will be reverted by the library.

### Loops and Block Gas Limit

The only function that loops over an Array is `mapCardsToArraysTuple()`, which is called by `getCards()` and `getCardsOwned()`. Both are `view` functions which only read data and don't cost gas - thus the block gas limit is not an issue here. If the loop were called in a transaction call, it would be dangerous, because the gas cost could be higher than one block would allow.
