import moxios from 'moxios';
import { getEPAJsonRecords } from '../actions';
import { EPA_URL } from '../../constants';
beforeAll(() => {
  moxios.install();
  moxios.stubRequest(EPA_URL, {
    status: 200,
    response: [
      {"host":"141.243.1.172","datetime":{"day":29,"hour":23,"minute":53,"second":25},"request":{"method":"GET","url":"/Software.html","protocol":"HTTP","protocol_version":"1.0"},"response_code":200,"document_size":1497,"error":false},
      {"host":"query2.lycos.cs.cmu.edu","datetime":{"day":29,"hour":23,"minute":53,"second":36},"request":{"method":"GET","url":"/Consumer.html","protocol":"HTTP","protocol_version":"1.0"},"response_code":200,"document_size":1325,"error":false},
      {"host":"tanuki.twics.com","datetime":{"day":29,"hour":23,"minute":53,"second":53},"request":{"method":"GET","url":"/News.html","protocol":"HTTP","protocol_version":"1.0"},"response_code":200,"document_size":1014,"error":false},
      {"host":"wpbfl2-45.gate.net","datetime":{"day":29,"hour":23,"minute":54,"second":15},"request":{"method":"GET","url":"/","protocol":"HTTP","protocol_version":"1.0"},"response_code":200,"document_size":4889,"error":false},
      {"host":"wpbfl2-45.gate.net","datetime":{"day":29,"hour":23,"minute":54,"second":16},"request":{"method":"GET","url":"/icons/circle_logo_small.gif","protocol":"HTTP","protocol_version":"1.0"},"response_code":200,"document_size":2624,"error":false},
      {"host":"wpbfl2-45.gate.net","datetime":{"day":29,"hour":23,"minute":54,"second":18},"request":{"method":"GET","url":"/logos/small_gopher.gif","protocol":"HTTP","protocol_version":"1.0"},"response_code":200,"document_size":935,"error":false}
    ]
  });
});

afterAll(() => {
  moxios.uninstall();
});

it('Requests EPA json records from backend', async () => {
  const response = await getEPAJsonRecords();
  expect(response).not.toBeNull();
  expect(response.length).toEqual(6);
});
