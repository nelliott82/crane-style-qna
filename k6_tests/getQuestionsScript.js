import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m30s', target: 10 },
    { duration: '20s', target: 0 },
  ],
};

export default function () {
  // var res = http.get('https://test.k6.io');
  var product_id = Math.floor(Math.random() * 1000000);
  var res = http.get(`http://localhost:8080/questions/${product_id}`);
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}