export function trimAddress(address: string, frontChars = 6, backChars = 4) {
  if (address.length <= frontChars + backChars + 3) {
    return address
  }
  return `${address.slice(0, frontChars)}...${address.slice(-backChars)}`
}
