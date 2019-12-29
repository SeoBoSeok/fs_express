'use strict';

const express = require('express');
// class화 해서 express 사용하기
// singleton pattern
const http = require('http');

class ApiServer extends http.Server {
  constructor(config) { // 외부의 환경설정을 동적으로 로드한다
    const app = express(); // serverless 환경등 마이크로서비스를 사용한 환경에서 로드밸런서가 커넥션을 처리하는데에 있어서 클래스로 인스턴스가 한번만 생성된 것을 보장받을 수 있다. (분산환경에서 의미가 크다)
    super(app);
    this.config = config;
    this.app = app;
    this.currentConns = new Set(); // 현재 연결된 Connection을 관리한다
    this.busy = new WeakSet(); // 현재 사용중인 Connection을 관리한다
    this.stopping = false; // 무중단 배포시 중단되어지는 과정인지 확인하는 변수
  }

  async start() {

  }
}

const init = async (config = {}) => { // server를 초기화(config) 하고 실행하는 과정
  const server = new ApiServer(config);
  return server.start();
}