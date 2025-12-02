ℹ️ 1xx (조건부 응답: 요청을 받았으며 작업을 계속함)
100 Continue: 요청의 시작 부분을 받았으니 나머지 데이터를 계속 보내도 좋음.

101 Switching Protocols: 클라이언트의 요청에 따라 프로토콜을 변경함 (예: HTTP → WebSocket).

102 Processing: (WebDAV) 서버가 요청을 수신하여 처리 중이나 아직 응답을 보낼 수 없음.

103 Early Hints: 서버가 최종 응답을 준비하는 동안 미리 리소스 링크 등을 힌트로 보냄.

✅ 2xx (성공: 요청을 성공적으로 수신, 이해, 수락함)
200 OK: 요청이 성공적으로 처리됨 (가장 일반적인 성공 코드).

201 Created: 요청이 성공하여 새로운 리소스가 생성됨 (보통 POST 요청 결과).

202 Accepted: 요청이 접수되었으나 처리가 완료되지 않음 (비동기 처리).

203 Non-Authoritative Information: 요청은 성공했으나, 응답 헤더 정보가 원본 서버가 아닌 프록시 등에서 변경됨.

204 No Content: 요청은 성공했으나 응답 본문에 보낼 데이터가 없음.

205 Reset Content: 요청을 성공적으로 처리했으니, 클라이언트의 화면(Form 등)을 초기화할 것을 권장함.

206 Partial Content: 클라이언트의 범위(Range) 요청에 따라 리소스의 일부만 전송함 (이어받기, 스트리밍).

207 Multi-Status: (WebDAV) 여러 리소스에 대한 여러 상태 코드를 XML로 묶어 응답함.

208 Already Reported: (WebDAV) 이미 앞선 응답에서 리소스의 멤버가 열거되었으므로 중복해서 알리지 않음.

226 IM Used: 서버가 리소스의 변경 사항(Delta)만 전송함 (HTTP Delta encoding).

🔃 3xx (리다이렉션: 요청 완료를 위해 추가 작업이 필요함)
300 Multiple Choices: 요청한 리소스에 대해 선택 가능한 여러 개의 응답(링크)이 있음.

301 Moved Permanently: 리소스가 영구적으로 새 URL로 이동함 (검색엔진이 인덱스를 갱신함).

302 Found: 리소스가 일시적으로 다른 URL에 있음 (기존 메서드 유지 보장 안 함).

303 See Other: 요청 처리 후, 결과를 다른 URL에서 GET 메서드로 확인해야 함.

304 Not Modified: 리소스가 변경되지 않았으니 클라이언트의 캐시를 사용함.

305 Use Proxy: (Deprecated) 반드시 지정된 프록시를 통해 접속해야 함.

306 Unused: (더 이상 사용되지 않음) 과거에 사용되던 코드.

307 Temporary Redirect: 리소스가 일시적으로 이동함 (302와 달리 요청 메서드와 본문을 변경 금지).

308 Permanent Redirect: 리소스가 영구적으로 이동함 (301과 달리 요청 메서드와 본문을 변경 금지).

❌ 4xx (클라이언트 오류: 요청에 문법 오류가 있거나 수행할 수 없음)
400 Bad Request: 잘못된 문법 등으로 서버가 요청을 이해할 수 없음.

401 Unauthorized: 인증이 필요함 (로그인 실패 또는 안 함).

402 Payment Required: 결제가 필요함 (미래 사용을 위해 예약됨, 현재는 거의 안 쓰임).

403 Forbidden: 서버가 요청을 이해했으나 승인을 거부함 (권한 없음).

404 Not Found: 요청한 리소스를 찾을 수 없음.

405 Method Not Allowed: 요청한 메서드(GET, POST 등)를 해당 리소스에서 허용하지 않음.

406 Not Acceptable: 클라이언트가 요청한 콘텐츠 특성(Accept 헤더)을 서버가 줄 수 없음.

407 Proxy Authentication Required: 프록시 서버에서의 인증이 필요함.

408 Request Timeout: 서버가 기다리는 시간 동안 요청이 오지 않음.

409 Conflict: 리소스의 현재 상태와 충돌함 (예: 이미 존재하는 파일 업로드 시도).

410 Gone: 리소스가 영구적으로 삭제되어 복구할 수 없음 (404보다 명확한 삭제).

411 Length Required: Content-Length 헤더가 지정되지 않아 서버가 거절함.

412 Precondition Failed: 요청 헤더의 전제 조건(If-Match 등)이 서버의 상태와 맞지 않음.

413 Payload Too Large: 요청 본문의 크기가 너무 커서 서버가 거절함.

414 URI Too Long: URI(URL)가 너무 길어서 서버가 처리할 수 없음.

415 Unsupported Media Type: 요청한 데이터 형식(Content-Type)을 서버가 지원하지 않음.

416 Range Not Satisfiable: 요청한 리소스의 범위(Range)가 잘못됨 (파일 크기보다 큰 범위 요청 등).

417 Expectation Failed: Expect 요청 헤더의 내용을 서버가 만족시킬 수 없음.

418 I'm a teapot: (만우절 RFC 2324) 찻주전자에 커피를 끓이라고 명령했을 때 거절하는 코드.

421 Misdirected Request: 서버가 해당 요청을 처리하도록 구성되지 않음 (잘못된 DNS 매핑 등).

422 Unprocessable Entity: (WebDAV) 문법은 맞지만 의미상 오류가 있어 처리할 수 없음.

423 Locked: (WebDAV) 리소스가 잠겨 있어 접근할 수 없음.

424 Failed Dependency: (WebDAV) 이전의 다른 요청이 실패하여 현재 요청도 실패함.

425 Too Early: 서버가 재생 공격(Replay Attack)의 위험이 있는 초기 데이터를 처리하길 거부함.

426 Upgrade Required: 클라이언트가 다른 프로토콜(예: TLS 1.0 -> 1.2)로 업그레이드해야 함.

428 Precondition Required: 서버가 요청 처리를 위해 조건부 요청(If-Match 등)을 요구함.

429 Too Many Requests: 지정된 시간 내에 너무 많은 요청을 보냄 (속도 제한).

431 Request Header Fields Too Large: 헤더 필드가 너무 커서 서버가 처리를 거부함.

451 Unavailable For Legal Reasons: 법적인 이유(검열, 저작권 등)로 리소스를 제공할 수 없음.

💥 5xx (서버 오류: 서버가 유효한 요청을 수행하지 못함)
500 Internal Server Error: 서버 내부 오류로 인해 요청을 처리할 수 없음.

501 Not Implemented: 서버가 요청을 수행하는 데 필요한 기능을 지원하지 않음.

502 Bad Gateway: 게이트웨이/프록시가 원본 서버로부터 잘못된 응답을 받음.

503 Service Unavailable: 서버 과부하 또는 유지보수로 인해 일시적으로 서비스 불가.

504 Gateway Timeout: 게이트웨이/프록시가 원본 서버의 응답을 시간 내에 받지 못함.

505 HTTP Version Not Supported: 요청에 사용된 HTTP 버전을 서버가 지원하지 않음.

506 Variant Also Negotiates: 서버 내부 설정 오류로 인해 투명 콘텐츠 협상이 순환 참조됨.

507 Insufficient Storage: (WebDAV) 서버의 용량이 부족하여 요청을 저장할 수 없음.

508 Loop Detected: (WebDAV) 요청을 처리하는 과정에서 무한 루프가 감지됨.

510 Not Extended: 요청을 처리하기 위해 더 많은 확장이 필요함 (거의 안 쓰임).

511 Network Authentication Required: 네트워크에 접근하기 위해 인증이 필요함 (와이파이 로그인 페이지 등).
