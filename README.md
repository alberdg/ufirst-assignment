
# Server access analysis

## The assignment

Your task is to import the access logs for the EPA from 1995, restructure the data and provide a graphical analysis of the data.

### The data

Enclosed in this archive is a file named epa-http.txt as well as the description from the following website (not always available): http://ita.ee.lbl.gov/html/contrib/EPA-HTTP.html

- Description

This trace contains a day's worth of all HTTP requests to the EPA WWW server located at Research Triangle Park, NC.

- Format

The logs are an ASCII file with one line per request, with the following columns:

1.  host​ making the request. A hostname when possible, otherwise the Internet address if the name could not be looked up.

2.  date​ in the format "[DD:HH:MM:SS]", where ​DD​ is either "29" or "30" for August 29 or August 30, respectively, and ​HH:MM:SS​ is the time of day using a 24-hour clock. Times are EDT (four hours behind GMT).

3.  request​ given in quotes.

4.  HTTP reply code​.

5.  bytes in the reply​.


- Measurement

The logs were collected from 23:53:25 EDT on Tuesday, August 29 1995 through 23:53:07 on Wednesday, August 30 1995, a total of 24 hours. There were 47,748 total requests, 46,014 ​GET​ requests, 1,622 ​POST​ requests, 107 ​HEAD​ requests, and 6 invalid requests. Timestamps have one-second precision. The WWW server software used was not recorded.

- Privacy

The logs fully preserve the originating host and HTTP request. Please do not however attempt any analysis beyond general traffic patterns.

- Acknowledgements

The logs were collected by Laura Bottomley (​laurab@ee.duke.edu)​ of Duke University. Please include a corresponding acknowledgement in publications analyzing the logs.

- Restrictions

The trace may be freely redistributed.

#### Assignment Tasks

1.  Write a script that imports the access logfile and creates a ​new​ file that holds the log data structured as a JSON-Array. (See the example at the bottom of this page)

2.  Create one or more HTML- and Javascript-Files that read the JSON-File and render the following analysis graphically as charts:

  ● Requests per minute over the entire time span

 ● Distribution of HTTP methods (GET, POST, HEAD,...)

  ● Distribution of HTTP answer codes (200, 404, 302,...)

 ● Distribution of the size of the answer of all requests with code 200 and size < 1000B

● Please make sure ALL log records are being imported by your importer script.

● The data is from 1995 and might contain uncommon characters - clean them in the first part.

● The folder “template” can be used as basis for the second part.

● For each analysis, pick the chart type that in your opinion makes most sense to describe the data (lines, bars, pie charts,...).

● Your application does ​not​ have to be supported by a variety of browsers - just state in which browser it runs best.


    Example for the JSON output file from part 1 (we added line breaks and indentations for the sake of readability)  
    ```
    [

    {  
    "host": "141.243.1.172", "datetime": {

    "day": "29", "hour": "23", "minute": "53", "second": "25"

    }, "request": {

    "method": "GET",  
    "url": "/Software.html", "protocol": "HTTP", "protocol_version": "1.0"

    },  
    "response_code": "200", "document_size": "1497"

    },  
    ...more data sets...

    ]
    ```

## The solution

### Cloning the solution

Run the following command in the directory where you want the solution to be cloned
```
git clone https://gitlab.com/alberdg811/ufirst-assignment.git
```

### Running the tests

- Client tests

```
cd client && npm run test
```

- Backend tests

```
cd backend && npm run test
```

### Running the solution

A docker-compose.yml file has been provided. Just run docker-compose -f <path to docker-compose.yml> up

This will create a docker container listening on ports 3000 and 3001. Port 3000 referes to the frontend side so once it is up you can visit http://localhost:3000 using your favourite browser. I used Google Chrome by default in a laptop computer.

### Solution structure

- Backend

| Name      | Description |
| -----------    | -----------                                        |
| package.json      | Revelevant project metadata|
| tsconfig.json      | Typescript configuration file|
| backend\src   | Contains backend source code|
| backend\src\constans     | Constants used across the backend|
| backend\interfaces\epa-json.ts     | EPA Json interfaces used in the backend|
| routes\\\_\_test\_\_\dashboard.test.ts      | Dashboard route tests|
| routes\\\_\_test\_\_\http-methods.test.ts      | Http methods route tests|
| routes\\\_\_test\_\_\requests-by-answer-codes.test.ts      | Requests by answer codes route tests|
| routes\\\_\_test\_\_\requests-by-size.test.ts      | Requests by size route tests|
| routes\answer-codes.ts      | Answer codes route implementation|
| routes\dashboard.ts      | Dashboard route implementation|
| routes\epa-json.ts      | EPA as json route implementation|
| routes\http-methods.ts      | Http methods route implementation|
| routes\requests-by-minute.ts      | Requests by minute route implementation|
| routes\requests-by-size.ts      | Requests by size route implementation|
| services\\\_\_test\_\_\epa-json.test.ts      | Epa json service tests|
| services\epa-json.ts      | EPA json singleton service|
| test\setup.ts      | Test environment setup|
| utils\\\_\_test\_\_\utils.test.ts   | Utils tests|
| utils\utils.ts   | Common utils|
| app.ts      | App initialization|
| epa-http.txt      | EPA log file|
| index.ts      | Server and EPA singleton initialization|


- Client

| Name      | Description |
| -----------    | -----------                                        |
| package.json      | Revelevant project metadata|
| tsconfig.json      | Typescript configuration file|
| public      | Publicly accesible files|
| src\actions\\\_\_test\_\_\actions.tsx      | Actions tests |
| src\actions\actions.tsx     | Actions file to interact with backend|
| src\components\\\_\_test\_\_\chart-wrapper.test.tsx      | Chart wrapper component tests|
| src\components\\\_\_test\_\_\header.test.tsx      | Header component tests|
| src\components\\\_\_test\_\_\requests-by-answer-code.test.tsx      | Requests by answer code tests|
| src\components\\\_\_test\_\_\requests-per-method.test.tsx      | Requests per method tests|
| src\components\\\_\_test\_\_\requests-per-minute.test.tsx      | Requests per minute tests|
| src\components\\\_\_test\_\_\requests-per-size.test.tsx      | Requests per size tests|
| src\components\chart-wrapper.tsx      | Chart wrapper component|
| src\components\dashboard.tsx      | Dashboard component|
| src\components\header.tsx      | Header component|
| src\components\requests-per-answer-code.tsx      | Requests per answer code component|
| src\components\requests-per-method-code.tsx      | Requests per method code component|
| src\components\requests-per-answer-size.tsx      | Requests per answer size component|
| src\components\responsive-bar-char.tsx      | Responsive bar char component wrapper over nivo chart responsive bar|
| src\components\responsive-pie-char.tsx      | Responsive pie char component wrapper over nivo chart responsive pie|
| src\components\context\dashboard-context.tsx      | Application context to hold data|
| src\interfaces\dashboard-data.tsx      | Dashboard data interface|
| src\interfaces\epa-json.tsx      | EPA json interface|
| src\interfaces\request-by-answer-code.tsx      | Request by answer code data interface|
| src\interfaces\request-by-method.tsx      | Request by method data interface|
| src\interfaces\request-by-minute.tsx      | Request by minute data interface|
| src\interfaces\request-by-size.tsx      | Request by size data interface|
| src\app.css      | App stylesheet|
| src\App.tsx      | App component|
| src\index.css      | Index stylesheet|
| src\index.tsx      | App starting point with route definition|
