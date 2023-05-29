# 注意，之所以叫 auto-instrument，是因为，这里直接用 trace.get_tracer，而实际上从源码可以看出，这样拿到的是 no-op 的组件，没有实际作用
# 而通过 pip install opentelemetry-distro 和 opentelemetry-bootstrap -a install，会安装一个 opentelemetry-instrument 的命令行程序，这个命令可以通过 --trace_export 等选项来自动搞定相关的环境配置（不确定是不是通过环境变量），而 trace.get_tracer 实际上就可以通过环境变量来得到所需的参数，来改变行为 

# command to run: https://opentelemetry.io/docs/instrumentation/python/getting-started/#run-the-instrumented-app

from opentelemetry import trace
from opentelemetry import metrics

from random import randint
from flask import Flask

tracer = trace.get_tracer("diceroller.tracer")
meter = metrics.get_meter("diceroller.meter")

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