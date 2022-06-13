import http from 'k6/http';
import { check, sleep } from 'k6';

// export const options = {
//   stages: [
//     { duration: '30s', target: 20 },
//     { duration: '1m30s', target: 10 },
//     { duration: '20s', target: 0 },
//   ],
// };
export const options = {
  stages: [
    { duration: '30s', target: 20 }
  ],
};

export default function () {
  // var res = http.get('https://test.k6.io');
  var question_id = Math.floor(Math.random() * 3000000);
  var res = http.get(`http://localhost:8080/answers/${question_id}`);
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}