import { Component, OnDestroy } from '@angular/core';
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';
import { TransportClient } from '../rpc-generated/transport.client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
  public client!: TransportClient;
  public cancellationToken: AbortController = new AbortController();

  constructor() {
    const transport = new GrpcWebFetchTransport({
      baseUrl: 'https://localhost:9000',
      abort: this.cancellationToken.signal
    });
    this.client = new TransportClient(transport);
  }

  public async unary(): Promise<void> {
    const unary = await this.client.unary(
      {
        text: window.crypto.randomUUID()
      },
      {
        abort: this.cancellationToken.signal
      }
    );
    console.log('unary', unary)
    console.log('unary data', unary.response)
  }

  public async doServerStreaming(): Promise<void> {
    const serverStream = this.client.serverStream(
      {
        text: window.crypto.randomUUID()
      },
      {
        signal: this.cancellationToken.signal
      }
    )
    console.log('serverStream', serverStream)
    for await (const response of serverStream.responses) {
      console.log('stream data', response)
    }
  }

  public stopStreaming(): void {
    this.cancellationToken.abort()
  }

  public ngOnDestroy(): void {
    this.cancellationToken.abort()
  }
}
