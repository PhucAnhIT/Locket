const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};
var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
var obj = JSON.parse($response.body);
obj.Attention = "Chúc mừng bạn! Premium đã kích hoạt tới năm 3000!";
var ohoang7 = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "3000-12-31T23:59:59Z",
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: "2024-07-28T01:04:18Z",
  purchase_date: "2025-09-15T01:04:17Z",
  store: "app_store"
};
var vuong2023 = {
  grace_period_expires_date: null,
  purchase_date: "2025-09-15T01:04:17Z",
  product_identifier: "com.ohoang7.premium.yearly",
  expires_date: "3000-12-31T23:59:59Z"
};
const match = Object.keys(mapping).find(e => ua.includes(e));
if (match) {
  let [entitlementKey, subId] = mapping[match];
  if (subId) {
    vuong2023.product_identifier = subId;
    obj.subscriber.subscriptions[subId] = ohoang7;
  } else {
    obj.subscriber.subscriptions["com.ohoang7.premium.yearly"] = ohoang7;
  }
  obj.subscriber.entitlements[entitlementKey] = vuong2023;
} else {
  obj.subscriber.subscriptions["com.ohoang7.premium.yearly"] = ohoang7;
  obj.subscriber.entitlements.pro = vuong2023;
}
$done({ body: JSON.stringify(obj) });
