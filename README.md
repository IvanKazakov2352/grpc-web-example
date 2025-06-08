# gRPC Web Example

Client: Angular 19

Server: C# ASP.NET 8.0

# Запуск

1) Установить утилиту <a href="https://grpc.io/docs/protoc-installation/" target="_blank">Protoc</a>!
2) Запустить команду для генерации TypeScript клиента
```bash
npm run proto:build
```
или ввести в терминале
```bash
protoc --proto_path=./src/proto --ts_out=./src/rpc-generated transport.proto
```
3) При запуске сервера генерация на стороне сервера сама пройдет! Спасибо ASP.NET!