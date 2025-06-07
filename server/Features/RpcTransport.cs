using Grpc.Core;
using Rpc;

namespace gRPC_Server.Features.RpcTransport;

public class RpcTransport : Transport.TransportBase
{
    public override Task<RpcResponse> Unary(RpcRequest request, ServerCallContext ctx)
    {
        var rpcResponse = new RpcResponse
        {
            Message = $"Text: {request.Text}"
        };

        Console.WriteLine(rpcResponse.Message);

        return Task.FromResult(rpcResponse);
    }

    public override async Task ServerStream(RpcRequest request, IServerStreamWriter<RpcResponse> responseStream, ServerCallContext ctx)
    {
        int number = 0;
        while(!ctx.CancellationToken.IsCancellationRequested)
        {
            var rpcResponse = new RpcResponse
            { 
                Message = $"Text: {request.Text} number {number += 1}" 
            };

            Console.WriteLine(rpcResponse.Message);

            await responseStream.WriteAsync(rpcResponse, ctx.CancellationToken);
            await Task.Delay(1000);
        } 
    }
}
