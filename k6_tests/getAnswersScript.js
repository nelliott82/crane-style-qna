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
    { duration: '10s', target: 100 }
  ],
};

export default function () {
  // var res = http.get('https://test.k6.io');
  var question_id = Math.floor(Math.random() * (3518963 - 3167067)) + 3167067;
  var res = http.get(`http://54.176.15.107:8080/answers/${question_id}`);
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(0.001);
}