import { shallowMount } from "@vue/test-utils";
import Component from "@/components/UsersPerPage.vue";

describe("UsersPerPage.vue", () => {
  it("is vue instance", () => {
    const wrapper = shallowMount(Component, {
      propsData: {
        count: 5
      }
    });

    expect(wrapper.isVueInstance()).toEqual(true);
  });

  it('has props "count"', () => {
    const wrapper = shallowMount(Component, {
      propsData: {
        count: 5
      }
    });

    expect(wrapper.vm.count).toBeDefined();
    expect(wrapper.vm.count).toEqual(5);

    wrapper.setProps({
      count: 10
    });

    expect(wrapper.vm.count).toEqual(10);
  });

  it('has props "countOptions"', () => {
    const wrapper = shallowMount(Component, {
      propsData: {
        count: 5
      }
    });

    expect(wrapper.vm.countOptions).toBeDefined();
    expect(wrapper.vm.countOptions).toEqual([5, 10, 15]);

    wrapper.setProps({
      countOptions: [1, 2, 3]
    });

    expect(wrapper.vm.countOptions).toEqual([1, 2, 3]);
  });

  it("method changeOption is correct", () => {
    const wrapper = shallowMount(Component, {
      propsData: {
        count: 5
      }
    });

    wrapper.vm.changeOption(10);
    expect(wrapper.emitted("input").length).toEqual(1);
    expect(wrapper.emitted("input")[0]).toEqual([10]);
  });

  it("is select in markup", () => {
    const wrapper = shallowMount(Component, {
      propsData: {
        count: 5
      }
    });

    expect(wrapper.contains("select")).toEqual(true);
  });
});
