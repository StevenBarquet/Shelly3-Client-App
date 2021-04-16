export function asyncHandlerGet(
  requestFunction,
  successFunction,
  rejectFunction,
  requestData,
  successData
) {
  requestFunction(requestData || null).then(res => {
    if (res.response) {
      rejectFunction(res.response.data);
    } else {
      successFunction(res.data, successData || null);
    }
  });
}

export function testSuccess(response) {
  console.log('testSuccess este:  --->', response);
}

export function testError(response) {
  console.log('testError este: --->', response);
}
