export function getChatId(user1Id: string, user2Id: string) {
  if (Number(user1Id) > Number(user2Id)) {
    return user2Id + user1Id
  } else {
    return user1Id + user2Id
  }
}

export const postDate = (paramsDate: Date): string => {
  return `${paramsDate.getFullYear()}.${
    paramsDate.getMonth() > 9
      ? paramsDate.getMonth()
      : '0' + paramsDate.getMonth()
  }.${
    paramsDate.getDate() > 9 ? paramsDate.getDate() : '0' + paramsDate.getDate()
  }, ${
    paramsDate.getHours() > 9
      ? paramsDate.getHours()
      : '0' + paramsDate.getHours()
  }:${
    paramsDate.getMinutes() > 9
      ? paramsDate.getMinutes()
      : '0' + paramsDate.getMinutes()
  }`
}
