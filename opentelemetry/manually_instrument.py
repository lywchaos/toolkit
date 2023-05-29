# 前面 auto 的方式有一堆默认配置之类的，比较魔法，难以看懂；这里是纯手动

# pip install opentelemetry-api
# pip install opentelemetry-sdk
# pip install opentelemetry-exporter-otlp-proto-grpc, if you want to send data using otlp and grpc to collector

from flask import Flask
from random import randint

# import api
from opentelemetry import trace
from opentelemetry import metrics

# import sdk
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.exporter.otlp.proto.grpc.metric_exporter import OTLPMetricExporter
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import (
    BatchSpanProcessor,
    ConsoleSpanExporter,
)
from opentelemetry.sdk.metrics import MeterProvider
from opentelemetry.sdk.metrics.export import (
    ConsoleMetricExporter,
    PeriodicExportingMetricReader,
)
from opentelemetry.sdk.resources import SERVICE_NAME, Resource

# Service name is required for most backends,
# and although it's not necessary for console export,
# it's good to set service name anyways.
resource = Resource(attributes={
    SERVICE_NAME: "your-service-name"
})

# configure trace started
trace_provider = TracerProvider(resource=resource)
to_console_processor = BatchSpanProcessor(ConsoleSpanExporter()) # output to console 
to_otlp_processor = BatchSpanProcessor(OTLPSpanExporter(endpoint="http://localhost:4317")) # send trace to endpoint, normally this refer to your collector's receiver; and found in source code that http://localhost:4317 is the default endpoint
trace_provider.add_span_processor(to_console_processor)
trace_provider.add_span_processor(to_otlp_processor)

# Sets the global default tracer provider
trace.set_tracer_provider(trace_provider)

# Creates a tracer from the global tracer provider
tracer = trace.get_tracer("my.tracer.name")

# configure trace ended


# configure metric started 
to_console_metric_reader = PeriodicExportingMetricReader(ConsoleMetricExporter()) # output to console
to_otlp_metric_reader = PeriodicExportingMetricReader(OTLPMetricExporter(endpoint="http://localhost:4317")) # send metrics to endpoint, normally this refer to your collector's receiver; and found in source code that http://localhost:4317 is the default endpoint
metric_provider = MeterProvider(
    metric_readers=[to_console_metric_reader, to_otlp_metric_reader], 
    resource=resource,
)

# Sets the global default meter provider
metrics.set_meter_provider(metric_provider)

# Creates a meter from the global meter provider
meter = metrics.get_meter("my.meter.name")

# configure metric ended


roll_counter = meter.create_counter(
    "roll_counter",
    description="The number of rolls by roll value",
)

app = Flask(__name__)

@app.route("/rolldice")
def roll_dice():
    return str(do_roll())

def do_roll():
    # This creates a new span that's the child of the current one
    with tracer.start_as_current_span("do_roll") as rollspan:
        res = randint(1, 6)
        rollspan.set_attribute("roll.value", res)
        roll_counter.add(1, {"roll.value": res})
        return res