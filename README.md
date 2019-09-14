# selfsignedcertificate
Brincando sobre o uso de certificado digital auto assinado

******** Passos para criar e assinar certificado digital  ***********

1. Criar chave privada, criar CSR (certificate signing request) e assinar CSR com a chave privada.
openssl req -x509 -newkey rsa:4096 -keyout server_key.pem -out server_cert.pem -nodes -days 365 -subj "/CN=localhost/O=Client\ Certificate\ Demo"


2. Criar um certificado digital assinado pelo dono do servidor (no caso, eu mesmo kk), 
para um determinado usuário.

ex: criar certificado para Alice
    * criar Chaves privadas e certificado e também o CSR
openssl req -newkey rsa:4096 -keyout alice_key.pem -out alice_csr.pem -nodes -days 365 -subj "/CN=Alice"
    * Assina o certificado da Alice usando o certificado do servidor.
    * aqui estamos fazendo o papél de uma autoridade certificadora.
openssl x509 -req -in alice_csr.pem -CA server_cert.pem -CAkey server_key.pem -out alice_cert.pem -set_serial 01 -days 365

3. Pra usar o certificado no browser, é necessário agrupar o certificado no formato P12.
openssl pkcs12 -export -clcerts -in alice_cert.pem -inkey alice_key.pem -out alice.p12

4. Para testar com o cURL
Senha: rodolfo                                
curl --insecure --cert alice.p12:rodolfo --cert-type p12 https://localhost:3000/authenticate
