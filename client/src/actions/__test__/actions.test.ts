import moxios from 'moxios';
import {
  getEPAJsonRecords,
  getHttpRequestsByMinute,
  getHttpRequestsByMethod,
  getHttpRequestsByAnswerCode,
  getHttpRequestsBySize,
  getDashboardData,
} from '../actions';
import {
  EPA_URL,
  HTTP_REQUEST_BY_MINUTE_URL,
  HTTP_REQUEST_BY_METHOD_URL,
  HTTP_REQUEST_BY_ANSWER_CODE_URL,
  HTTP_REQUEST_BY_SIZE_URL,
  DASHBOARD_DATA_URL,
} from '../../constants';
beforeAll(() => {
  moxios.install();
  moxios.stubRequest(EPA_URL, {
    status: 200,
    response: [
      {'host':'141.243.1.172','datetime':{'day':29,'hour':23,'minute':53,'second':25},'request':{'method':'GET','url':'/Software.html','protocol':'HTTP','protocol_version':'1.0'},'response_code':200,'document_size':1497,'error':false},
      {'host':'query2.lycos.cs.cmu.edu','datetime':{'day':29,'hour':23,'minute':53,'second':36},'request':{'method':'GET','url':'/Consumer.html','protocol':'HTTP','protocol_version':'1.0'},'response_code':200,'document_size':1325,'error':false},
      {'host':'tanuki.twics.com','datetime':{'day':29,'hour':23,'minute':53,'second':53},'request':{'method':'GET','url':'/News.html','protocol':'HTTP','protocol_version':'1.0'},'response_code':200,'document_size':1014,'error':false},
      {'host':'wpbfl2-45.gate.net','datetime':{'day':29,'hour':23,'minute':54,'second':15},'request':{'method':'GET','url':'/','protocol':'HTTP','protocol_version':'1.0'},'response_code':200,'document_size':4889,'error':false},
      {'host':'wpbfl2-45.gate.net','datetime':{'day':29,'hour':23,'minute':54,'second':16},'request':{'method':'GET','url':'/icons/circle_logo_small.gif','protocol':'HTTP','protocol_version':'1.0'},'response_code':200,'document_size':2624,'error':false},
      {'host':'wpbfl2-45.gate.net','datetime':{'day':29,'hour':23,'minute':54,'second':18},'request':{'method':'GET','url':'/logos/small_gopher.gif','protocol':'HTTP','protocol_version':'1.0'},'response_code':200,'document_size':935,'error':false}
    ]
  });

  moxios.stubRequest(HTTP_REQUEST_BY_MINUTE_URL, {
    status: 200,
    response: {
      '0': 828,
      '1': 761,
      '2': 708,
      '3': 667,
      '4': 811,
    }
  });

  moxios.stubRequest(HTTP_REQUEST_BY_METHOD_URL, {
    status: 200,
    response: {
      'GET': 40828,
      'POST': 161,
      'HEAD': 408,
    }
  });

  moxios.stubRequest(HTTP_REQUEST_BY_ANSWER_CODE_URL, {
    status: 200,
    response: {
      '200': 30000,
      '400': 10000,
      '302': 6000,
    }
  });

  moxios.stubRequest(HTTP_REQUEST_BY_SIZE_URL, {
    status: 200,
    response: {
      '0': {
      'id': '0',
      'value': 194
      },
      '33': {
      'id': '33',
      'value': 2
      },
      '34': {
      'id': '34',
      'value': 1
      },
    }
  });

  moxios.stubRequest(DASHBOARD_DATA_URL, {
    status: 200,
    response: {
      recordsByMinute: [
        {
          minute: '0',
          value: 828
        },
        {
         minute: '1',
         value: 761,
       },
     ],
     recordsBySize: [
       {
         'id': '0',
         'value': 194
       },
       {
         'id': '33',
         'value': 2
       },
       {
         'id': '34',
         'value': 1
       }
     ],
     recordsByMethod: [
       {
         id: 'GET',
         label: 'GET',
         value: 40828
       },
       {
         id: 'POST',
         label: 'POST',
         value: 161
       },
       {
         id: 'HEAD',
         label: 'HEAD',
         value: 408
       }
     ],
     recordsByAnswerCode: [
       {
         id: '200',
         value: 30000
       },
       {
         id: '400',
         value: 10000
       },
       {
         id: '302',
         value: 6000,
       }
     ]
    }
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

it('Requests data for http requests per minute', async () => {
  const response = await getHttpRequestsByMinute();
  expect(response).not.toBeNull();
  expect(response['0']).toEqual(828);
})

it('Requests data for http requests per method', async () => {
  const response = await getHttpRequestsByMethod();
  expect(response).not.toBeNull();
  expect(response['GET']).toEqual(40828);
  expect(response['POST']).toEqual(161);
  expect(response['HEAD']).toEqual(408);
})

it('Requests data for http requests per answer code', async () => {
  const response = await getHttpRequestsByAnswerCode();
  expect(response).not.toBeNull();
  expect(response['200']).toEqual(30000);
  expect(response['400']).toEqual(10000);
  expect(response['302']).toEqual(6000);
})

it('Requests data for http requests per size', async () => {
  const response = await getHttpRequestsBySize();
  expect(response).not.toBeNull();
  expect(response['0'].value).toEqual(194);
  expect(response['33'].value).toEqual(2);
  expect(response['34'].value).toEqual(1);
})


it('Requests dashboard data', async () => {
  const response = await getDashboardData();
  expect(response).not.toBeNull();
  expect(response.recordsByMinute).not.toBeNull();
  expect(response.recordsByMinute.length).toEqual(2);
  expect(response.recordsBySize).not.toBeNull();
  expect(response.recordsBySize.length).toEqual(3);
  expect(response.recordsByMethod).not.toBeNull();
  expect(response.recordsByMethod.length).toEqual(3);
  expect(response.recordsByAnswerCode).not.toBeNull();
  expect(response.recordsByAnswerCode.length).toEqual(3);

})
