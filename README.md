#### 의류 쇼핑몰 백엔드 API
  - 상품의 이미지와 관련 정보 등록
    - 비용 문제로 인하여 이미지 파일은 클라우드 서비스가 아니라 백엔드 내부에 일시적으로 저장됩니다.(개선할 예정)
  - Oauth2를 이용한 포털 사이트(구글, 네이버, 카카오) 연동
  - 회원 목록 관리
  - 댓글 시스템 관리

#### 사용된 기술
언어: 타입스크립트
- 데이터의 송수신을 위해서 정확한 타입 기재를 위해 사용
프레임워크: NEST JS
ORM: mongoose
DB : mongo atlas

#### 추후 업데이트 
- 헥사고날 아키텍처(ports and adapter) 패턴으로 변경
