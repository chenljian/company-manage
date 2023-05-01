import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import axios from 'axios'
import { message} from "ant-design-vue";


Vue.prototype.$axios = axios



import "moment/locale/zh-cn";

import {
    Button,
    Layout,
    Icon,
    Tooltip,
    Dropdown,
    Avatar,
    Spin,
    AutoComplete,
    Input,
    Menu,
    Popover,
    Badge,
    Tabs,
    List,
    Tag,
    Row,
    Col,
    Card,
    DatePicker,
    Radio,
    Table,
    Divider,
    Breadcrumb,
    Form,
    FormModel,
    Select,
    Popconfirm,
    Modal,
} from "ant-design-vue";


const { Content, Header, Footer, Sider } = Layout;
const MenuItem = Menu.Item;
const MenuDivider = Menu.Divider;
const MenuSubMenu = Menu.SubMenu;
const TabsTabPane = Tabs.TabPane;
const ListItem = List.Item;
const ListItemMeta = List.Item.Meta;
const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const CardGrid = Card.Grid;
const CardMeta = Card.Meta;
const BreadcrumbItem = Breadcrumb.Item;
const FormItem = Form.Item;
const FormModelItem = FormModel.Item;
const TextArea = Input.TextArea;


Vue.config.productionTip = false;

Vue.component(Button.name, Button);
Vue.component(Button.Group.name, Button.Group);
Vue.component(Layout.name, Layout);
Vue.component(Icon.name, Icon);
Vue.component(Tooltip.name, Tooltip);
Vue.component(Dropdown.name, Dropdown);
Vue.component(Avatar.name, Avatar);
Vue.component(Spin.name, Spin);
Vue.component(AutoComplete.name, AutoComplete);
Vue.component(Input.name, Input);
Vue.component(TextArea.name, TextArea);
Vue.component(Menu.name, Menu);
Vue.component(MenuItem.name, MenuItem);
Vue.component(MenuDivider.name, MenuDivider);
Vue.component(Popover.name, Popover);
Vue.component(Badge.name, Badge);
Vue.component(Tabs.name, Tabs);
Vue.component(TabsTabPane.name, TabsTabPane);
Vue.component(List.name, List);
Vue.component(ListItem.name, ListItem);
Vue.component(ListItemMeta.name, ListItemMeta);
Vue.component(Tag.name, Tag);
Vue.component(Tag.CheckableTag.name, Tag.CheckableTag);
Vue.component(MenuSubMenu.name, MenuSubMenu);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Card.name, Card);
Vue.component(CardGrid.name, CardGrid);
Vue.component(CardMeta.name, CardMeta);
Vue.component(DatePicker.name, DatePicker);
Vue.component(RangePicker.name, RangePicker);
Vue.component(Radio.name, Radio);
Vue.component(RadioGroup.name, RadioGroup);
Vue.component(RadioButton.name, RadioButton);
Vue.component(Table.name, Table);
Vue.component(Divider.name, Divider);
Vue.component(Breadcrumb.name, Breadcrumb);
Vue.component(BreadcrumbItem.name, BreadcrumbItem);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(FormModel.name, FormModel);
Vue.component(FormModelItem.name, FormModelItem);
Vue.component(Select.name, Select);
Vue.component(Select.Option.name, Select.Option);
Vue.component(Popconfirm.name, Popconfirm);
Vue.component(Modal.name, Modal);

Vue.component(Content.name, Content);
Vue.component(Header.name, Header);
Vue.component(Footer.name, Footer);
Vue.component(Sider.name, Sider);


/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App)
});

router.beforeEach((to, from, next) => {
    // 获取用户登录成功后存储的登录标志
    const isLogin = sessionStorage.getItem("isLogin");
    // 如果登录标志存在且为isLogin,即用户已登录
    if (isLogin === 'true') {
        // // 设置vuex登录状态为已登录
        // store.state.isLogin = true;
        next()
        // 如果已登录，进行登录注册页面，则定向会首页
        if (to.meta.needLogin == false) {
            message.error('请先退出登录')
            next({ path: '/' })
        }
        // 如果登录标志不存在，即未登录
    } else {
        // 用户想进入需要登录的页面，则定向回登录页面
        if (to.meta.needLogin) {
            next({ path: '/user/login' })
            message.info('请先登录')
            // 用户进入无需登录的界面，则跳转继续
        } else {
            next()
        }
    }
})

