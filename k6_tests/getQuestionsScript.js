import http from 'k6/http';
import { check, sleep } from 'k6';

// export const options = {
//   stages: [
//     { duration: '30s', target: 0 },
//     { duration: '30s', target: 10 },
//     { duration: '1m', target: 100 },
//     { duration: '1m', target: 1000 },
//     { duration: '1m', target: 10000 },
//     { duration: '1m', target: 1000 },
//     { duration: '1m', target: 100 },
//     { duration: '30s', target: 10 },
//     { duration: '30s', target: 0 },
//   ],
// };
export const options = {
  stages: [
    { duration: '10s', target: 10 }
  ],
};

export default function () {
  var product_id = Math.floor(Math.random() * (1000011 - 900000)) + 900000;
  var res = http.get(`http://localhost:8080/questions/${product_id}`);
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(0.001);
}