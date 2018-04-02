/*
* Author: @nayunhwan (github.com/nayunhwan)
* Email: nayunhwan.dev@mgail.com
*/

import * as WebRequestUtil from "../Utils/WebRequestUtil";

export async function postActivity() {
  const url = "api/category/activity";
  const res = await WebRequestUtil.post({ url });
  return res.data;
}
