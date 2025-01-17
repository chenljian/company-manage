import { isUrl } from "@/utils/utils";

const menuData = [
    {
        name: "仪表盘",
        icon: "dashboard",
        path: "dashboard",
        children: [
            {
                name: "生产数据",
                path: "run-data"
            },
            // {
            //     name: "分析页",
            //     path: "analysis"
            // },
            // {
            //     name: "监控页",
            //     path: "monitor"
            // },
            // {
            //     name: "工作台",
            //     path: "workplace"
            //     // hideInBreadcrumb: true,
            //     // hideInMenu: true,
            // }
        ]
    },
    // {
    //     name: "表单页",
    //     icon: "form",
    //     path: "form",
    //     children: [
    //         {
    //             name: "基础表单",
    //             path: "basic-form"
    //         },
    //         {
    //             name: "分步表单",
    //             path: "step-form"
    //         },
    //         {
    //             name: "高级表单",
    //             authority: "admin",
    //             path: "advanced-form"
    //         }
    //     ]
    // },
    {
        name: "产品",
        icon: "table",
        path: "product",
        children: [
            {
                name: "产品维护",
                path: "product-list"
            },
            // {
            //     name: "标准列表",
            //     path: "basic-list"
            // },
            // {
            //     name: "卡片列表",
            //     path: "card-list"
            // },
            // {
            //     name: "搜索列表",
            //     path: "search",
            //     children: [
            //         {
            //             name: "搜索列表（文章）",
            //             path: "articles"
            //         },
            //         {
            //             name: "搜索列表（项目）",
            //             path: "projects"
            //         },
            //         {
            //             name: "搜索列表（应用）",
            //             path: "applications"
            //         }
            //     ]
            // }
        ]
    },
    {
        name: "生产单",
        icon: "profile",
        path: "order",
        children: [
            {
                name: "查询生产单",
                path: "order-list"
            },
            {
                name: "新增生产单",
                path: "add-order"
            },
            {
                name: "审批生产单",
                path: "review-order"
            },
        ]
    },
    {
        name: "出入库",
        icon: "form",
        path: "bound",
        children: [
            {
                name: "出入库记录",
                path: "bound-record"
            },
            {
                name: "入库",
                path: "inbound"
            },
            {
                name: "出货",
                path: "outbound"
            },
        ]
    },
    // {
    //     name: "详情页",
    //     icon: "profile",
    //     path: "profile",
    //     children: [
    //         {
    //             name: "基础详情页",
    //             path: "basic"
    //         },
    //         {
    //             name: "高级详情页",
    //             path: "advanced",
    //             authority: "admin"
    //         }
    //     ]
    // },
    // {
    //     name: "结果页",
    //     icon: "check-circle-o",
    //     path: "result",
    //     children: [
    //         {
    //             name: "成功",
    //             path: "success"
    //         },
    //         {
    //             name: "失败",
    //             path: "fail"
    //         }
    //     ]
    // },
    // {
    //     name: "异常页",
    //     icon: "warning",
    //     path: "exception",
    //     children: [
    //         {
    //             name: "403",
    //             path: "403"
    //         },
    //         {
    //             name: "404",
    //             path: "404"
    //         },
    //         {
    //             name: "500",
    //             path: "500"
    //         },
    //         {
    //             name: "触发异常",
    //             path: "trigger",
    //             hideInMenu: true
    //         }
    //     ]
    // },
    // {
    //     name: "账户",
    //     icon: "user",
    //     path: "user",
    //     authority: "guest",
    //     children: [
    //         {
    //             name: "登录",
    //             path: "login"
    //         },
    //         {
    //             name: "注册",
    //             path: "register"
    //         },
    //         {
    //             name: "注册结果",
    //             path: "register-result"
    //         }
    //     ]
    // }
];

function formatter(data, parentPath = "/", parentAuthority) {
    return data.map(item => {
        let { path } = item;
        if (!isUrl(path)) {
            path = parentPath + item.path;
        }
        const result = {
            ...item,
            path,
            authority: item.authority || parentAuthority
        };
        if (item.children) {
            result.children = formatter(
                item.children,
                `${parentPath}${item.path}/`,
                item.authority
            );
        }
        return result;
    });
}

export const getMenuData = () => formatter(menuData);
