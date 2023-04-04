repo: https://github.com/donnemartin/system-design-primer

# (System design topics: start here)[https://github.com/donnemartin/system-design-primer#system-design-topics-start-here]

## (Step 2: Review the scalability article)[https://github.com/donnemartin/system-design-primer#step-2-review-the-scalability-article]

(Scalability for Dummies - Part 1: Clones)[https://web.archive.org/web/20220530193911/https://www.lecloud.net/post/7295452622/scalability-for-dummies-part-1-clones]

Summary:

Solution for horizontal scale.

Quote:

First golden rule for scalability: every server contains exactly the same codebase and does not store any user-related data, like sessions or profile pictures, on local disc or memory.

Note：

主要说了 load balancer 和 clone。不过文章确实比较老了（2011 年），实际上 k8s 就完全可以做到这些事情。


(Scalability for Dummies - Part 2: Database)[https://web.archive.org/web/20220602114024/https://www.lecloud.net/post/7994751381/scalability-for-dummies-part-2-database]

Summary:

Best practice when using database.
Scalable database solution.

Note:

两种数据库使用方法：
1. 关系型(MySQL)，及常见方法（加配置，主从，查询调优）
    - 缺点在于，越到后面，每次维护的成本就越高
1. 从开始就用 NoSQL，且从来不让数据库做 join 操作，而是把数据的 manipulation 放在业务代码

永远选 2，不要让数据库干活，数据库只用来存取数据就可以了。

(Scalability for Dummies - Part 3: Cache)[https://web.archive.org/web/20220308125625/https://www.lecloud.net/post/9246290032/scalability-for-dummies-part-3-cache]

Summary:

Best practice about cache.

Note:

大概回忆一下：cache 应该在 app 和 database 之间，app 永远先从 cache 中取数据，拿不到才去 database。另外 cache 和 database 的一致性也是需要额外了解的问题。

回来，两种 cache 的使用方法：
1. cache queries。把 query 语句 hash 一下当成 key，拿到的 data 作为对应的 value 来 cache
    - 问题在于，比如有个数据 A，如果有许多复杂的 query 都包含这个数据 A，而 A 变化了，此时不能再从 cache 中拿 A 了，后果是所有包含 A 的 cache 都得更新
1. cache objetcs。比如实际编码中经常有如下场景：一个类，其中有许多数据字段，这些字段通过类方法从数据库中拿数据放到类实例中。此时，当字段数据都拿到了，已经 ready for 后续操作的时候，直接把整个类 cache 起来
    - 这样就避免了上述问题，如果有 object 变化的话，只更新这个 object 即可
    - enable 了 asyn（没懂）

(Scalability for Dummies - Part 4: Asynchronism)[https://web.archive.org/web/20220617032344/https://www.lecloud.net/post/9699762917/scalability-for-dummies-part-4-asynchronism]

应对不同场景的两种方法：
1. 假异步：预加载
1. 真异步：mq

mq 可以用来解耦，相应的后端可以从中获得几乎无限的 scalability

# (Performance vs scalability)[https://github.com/donnemartin/system-design-primer#performance-vs-scalability]

Definition:
1. A service is scalable if it results in increased performance in a manner proportional to resources added.
1. An always-on service is said to be scalable if adding resources to facilitate redundancy does not result in a loss of performance.

但线性收益基本是无法达到的，所以一切都是 trade-off，看你 prefer performance or scalability

# (Latency vs throughput)[https://github.com/donnemartin/system-design-primer#latency-vs-throughput]

Generally, you should aim for maximal throughput with acceptable latency.

# (Availability vs consistency)[https://github.com/donnemartin/system-design-primer#availability-vs-consistency]

CAP 定理

(Consistency patterns)[https://github.com/donnemartin/system-design-primer#consistency-patterns]

weak/eventual/strong

(Availability patterns)[https://github.com/donnemartin/system-design-primer#availability-patterns]

fail-over/replication