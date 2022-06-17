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
    { duration: '10s', target: 100 }
  ],
};

export default function () {
  // var res = http.get('https://test.k6.io');
  var question_id = Math.floor(Math.random() * (3518963 - 3167067)) + 3167067;

  var res = http.put(`http://localhost:8080/questions/${question_id}/helpful`);
  check(res, { 'status was 204': (r) => r.status == 204 });
  sleep(0.001);
}
