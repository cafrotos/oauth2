# Oauth2-JWT

## 1. Cài đặt

```bash
npm install oauth2-jwt
```
## 2. Tính năng

- Hỗ trợ grants: `authorization_code`, `client_credentials`, `refresh_token`, `password`.
- Sử dụng Promise, async await.

## 3. Cách sử dụng

### 3.1 Tạo instance oauth2-jwt

```js
const Oauth2 = require('oauth2-jwt');
const oauth = new Oauth2(settings);
```

- Parameter settings có các tham số như sau:
| Parameter | Example | Description | Required |
|-----------|---------|-------------|----------|
| accessTokenPrivateKey | "accesstoken" | Access token private key | true | 
| refreshTokenPrivateKey | "refreshtoken" | Refresh token private key | true |
| authorizationCodePrivateKey | "authorizationcode" | Authorization Code Private Key | true |
| accessTokenLifeTime | 60 * 60 * 4 (second - default) | | true |
| refreshTokenLifeTime | 60 * 60 * 4 (second - default) | | true |
| authorizationCodeLifeTime | 60 * 60 * 4 (second - default) | | true |
| getUser | function | Function lấy thông tin user | true |
| getApplication | function | Function lấy thông tin application | true |