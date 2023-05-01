import Vue from "vue";
import Router from "vue-router";
import BasicLayout from "@/layouts/BasicLayout";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/user",
            component: () => import("@/layouts/UserLayout"),
            children: [
                {
                    path: "/user/login",
                    component: () => import("@/routes/User/Login"),
                    meta: {
                        needLogin: false
                    }
                },
                {
                    path: "/user/register",
                    component: () => import("@/routes/User/Register")
                },
                {
                    path: "/user/register-result",
                    component: () => import("@/routes/User/RegisterResult")
                }
            ]
        },
        {
            path: "/",
            component: BasicLayout,
            redirect: "/dashboard/run-data",
            children: [
                {
                    path: "/dashboard/run-data",
                    component: () => import("@/routes/Dashboard/RunData")
                },
                {
                    path: "/dashboard/analysis",
                    component: () => import("@/routes/Dashboard/Analysis")
                },
                {
                    path: "/dashboard/monitor",
                    component: () => import("@/routes/Dashboard/Monitor")
                },
                {
                    path: "/dashboard/workplace",
                    component: () => import("@/routes/Dashboard/Workplace")
                },
                {
                    path: "/form/basic-form",
                    component: () => import("@/routes/Form/BasicForm")
                },
                {
                    path: "/form/step-form",
                    component: () => import("@/routes/Form/StepForm"),
                    redirect: "/form/step-form/info",
                    children: [
                        {
                            path: "/form/step-form/info",
                            name: "分步表单（填写转账信息）",
                            component: () =>
                                import("@/routes/Form/StepForm/Info")
                        },
                        {
                            path: "/form/step-form/confirm",
                            name: "分步表单（确认转账信息）",
                            component: () =>
                                import("@/routes/Form/StepForm/Confirm")
                        },
                        {
                            path: "/form/step-form/result",
                            name: "分步表单（完成）",
                            component: () =>
                                import("@/routes/Form/StepForm/StepFormResult")
                        }
                    ]
                },
                {
                    path: "/form/advanced-form",
                    component: () => import("@/routes/Form/AdvancedForm")
                },
                {
                    path: "/list/table-list",
                    component: () => import("@/routes/List/TableList"),
                    meta: {
                        needLogin: true
                    }
                },
                {
                    path: "/list/basic-list",
                    component: () => import("@/routes/List/BasicList")
                },
                {
                    path: "/list/card-list",
                    component: () => import("@/routes/List/CardList")
                },
                {
                    path: "/list/search",
                    component: () => import("@/routes/List/SearchList"),
                    redirect: "/list/search/articles",
                    children: [
                        {
                            path: "/list/search/articles",
                            component: () =>
                                import("@/routes/List/SearchList/Articles")
                        },
                        {
                            path: "/list/search/projects",
                            component: () =>
                                import("@/routes/List/SearchList/Projects")
                        },
                        {
                            path: "/list/search/applications",
                            component: () =>
                                import("@/routes/List/SearchList/Applications")
                        }
                    ]
                },
                {
                    path: "/order/order-list",
                    component: () => import("@/routes/Order/OrderList"),
                    meta: {
                        needLogin: true
                    }
                },
                {
                    path: "/order/add-order",
                    component: () => import("@/routes/Order/AddOrderForm-vue")
                },
                {
                    path: "/order/add-success",
                    component: () => import("@/routes/Order/Success")
                },
                {
                    path: "/order/detail",
                    component: () => import("@/routes/Order/OrderDetail")
                },
                {
                    path: "/order/review-order",
                    component: () => import("@/routes/Order/ReviewList")
                },
                {
                    path: "/bound/bound-record",
                    component: () => import("@/routes/Bound/BoundList")
                },
                {
                    path: "/bound/inbound",
                    component: () => import("@/routes/Bound/InBound")
                },
                {
                    path: "/inbound/success",
                    component: () => import("@/routes/Bound/Success")
                },
                {
                    path: "/outbound/success",
                    component: () => import("@/routes/Bound/OutboundSuccess")
                },
                {
                    path: "/bound/outbound",
                    component: () => import("@/routes/Bound/OutBound")
                },

                {
                    path: "/bound/add-outbound",
                    component: () => import("@/routes/Bound/AddOutBound")
                },
                {
                    path: "/bound/out-detail",
                    component: () => import("@/routes/Bound/OutDetail")
                },
                {
                    path: "/profile/basic",
                    component: () => import("@/routes/Profile/BasicProfile")
                },
                {
                    path: "/profile/advanced",
                    component: () => import("@/routes/Profile/AdvancedProfile")
                },
                {
                    path: "/result/success",
                    component: () => import("@/routes/Result/Success")
                },
                {
                    path: "/result/fail",
                    component: () => import("@/routes/Result/Error")
                },
                {
                    path: "/exception/403",
                    component: () => import("@/routes/Exception/403")
                },
                {
                    path: "/exception/404",
                    component: () => import("@/routes/Exception/404")
                },
                {
                    path: "/exception/500",
                    component: () => import("@/routes/Exception/500")
                },
                {
                    path: "/exception/trigger",
                    component: () =>
                        import("@/routes/Exception/triggerException")
                }
            ]
        },
        {
            path: "*",
            redirect: "/"
        }
    ]
});
