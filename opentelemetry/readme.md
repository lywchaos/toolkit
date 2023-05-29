# Overview

一种通用的 trace/metrics/log 的导出方法，可以接 jaeger/prometheus/elasticsearch 之类的来做系统的监控

主要的使用方法是：先在代码中通过 opentelemetry-sdk/api（注意配置，比如这些 signal 要输出到哪里）手动加各种 trace/metrics/log，然后这些 signals 会 export 到 opentelemetry 的 collector，collector 经过 receive->process>export 的步骤，最终 export 到各种其它系统上（jaeger/prometheus/elasticsearch）等完成可视化。

# auto_instrument.py

看注释即可

# manually_instrument.py -> jaeger

ref: https://www.jaegertracing.io/docs/1.45/getting-started/#all-in-one

```
flask --app=manually_instrument:app run --reload --host 0.0.0.0 -p 9879
# 注意这里的 4317 端口和 manually_instrument.py 里面对应，这种方法没有自己启动 collector，因为 jaeger-all-in-one 里面自带了一个 collector 
sudo docker run -d --name jaeger \
  -e COLLECTOR_ZIPKIN_HOST_PORT=:9411 \
  -e COLLECTOR_OTLP_ENABLED=true \
  -p 6831:6831/udp \
  -p 6832:6832/udp \
  -p 5778:5778 \
  -p 16686:16686 \
  -p 4317:4317 \
  -p 4318:4318 \
  -p 14250:14250 \
  -p 14268:14268 \
  -p 14269:14269 \
  -p 9411:9411 \
  jaegertracing/all-in-one:1.45
```

向自己的 flask 服务发几个请求，然后浏览器访问 http://localhost:16686 查看 jaeger 即可

# manually_instrument.py

1. 看注释
2. launch collector
```bash
export TOOLKIT="your-path"
sudo docker run -p 4444:4444 -v ${TOOLKIT}/otel_collector.yaml:/etc/otelcol-contrib/config.yaml otel/opentelemetry-collector-contrib:0.78.0
```
3. `flask --app=manually_instrument:app run --reload --host 0.0.0.0 -p 9879` and request to see what's going on 

// TODO