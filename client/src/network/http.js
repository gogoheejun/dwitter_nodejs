export default class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async fetch(url, options) {
    //네트워크요청
    const res = await fetch(`${this.baseURL}${url}`, {
      //이 fetch는 브라우저에 있는 fetch임
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    //바디있는지 확인
    let data;
    try {
      //json으로 추출
      data = await res.json();
    } catch (error) {
      console.log(error);
    }

    if (res.status > 299 || res.status < 200) {
      const message =
        data && data.message ? data.message : "Something is wrong!";
      throw new Error();
    }
    return data;
  }
}
