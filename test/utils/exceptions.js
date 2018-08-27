// Source: https://ethereum.stackexchange.com/a/48629
/* eslint-disable */

const PREFIX = 'VM Exception while processing transaction: '

async function tryCatch(promise, message) {
  try {
    await promise
    throw null
  } catch (error) {
    assert(error, 'Expected an error but did not get one')
    assert(
      error.message.startsWith(PREFIX + message),
      "Expected an error starting with '" + PREFIX + message + "' but got '" + error.message + "' instead"
    )
  }
}

export const catchRevert = async promise => await tryCatch(promise, 'revert')
export const catchOutOfGas = async promise => await tryCatch(promise, 'out of gas')
export const catchInvalidJump = async promise => await tryCatch(promise, 'invalid JUMP')
export const catchInvalidOpcode = async promise => await tryCatch(promise, 'invalid opcode')
export const catchStackOverflow = async promise => await tryCatch(promise, 'stack overflow')
export const catchStackUnderflow = async promise => await tryCatch(promise, 'stack underflow')
export const catchStaticStateChange = async promise => await tryCatch(promise, 'static state change')
