import { todoHistoryItemTemplate } from "./template";
export default function todoHistoryItem(parent, props) {
  props.timeStampText = currentTimestampReturn(props.timeStamp);
  props.text = formatHistoryText(props);
  parent.innerHTML = todoHistoryItemTemplate(props);
}

function formatHistoryText(props) {
  switch (props.actionKind) {
    case "등록":
      return `<b>${props.todoTitle}</b>을(를) <b>${props.todoSrc}</b>에 <b>등록</b>하였습니다.`;
    case "삭제":
      return `<b>${props.todoTitle}</b>을(를) <b>${props.todoSrc}</b>에서 <b>삭제</b>하였습니다.`;
    case "수정":
      return `<b>${props.todoTitle}</b>을(를) <b>수정</b>하였습니다.`;
    case "이동":
      return `<b>${props.todoTitle}</b>을(를) <b>${props.todoSrc}</b>에서 <b>${props.todoDst}</b>으로 <b>이동</b>하였습니다.`;
  }
  return "";
}

//생성 timeStamp와 비교하여 지금 시간을 계산하는 함수
function currentTimestampReturn(createTimeStamp) {
  const currentTimestamp = new Date().getTime();
  const resultInSeconds = Math.floor(
    (currentTimestamp - createTimeStamp) / 1000
  );

  if (resultInSeconds < 60) {
    return "최근";
  } else if (resultInSeconds < 3600) {
    const minutes = Math.floor(resultInSeconds / 60);
    return `${minutes}분 전`;
  } else if (resultInSeconds < 86400) {
    const hours = Math.floor(resultInSeconds / 3600);
    return `${hours}시간 전`;
  } else {
    const days = Math.floor(resultInSeconds / 86400);
    return `${days}일 전`;
  }
}
