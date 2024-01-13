export function autobind(_1: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value; // 우리가 원래 정의한 메소드
  const adjDescriptor: PropertyDescriptor = {
    configurable: true, // 재정의 가능
    get() {
      const boundFn = originalMethod.bind(this); // this는 decorator가 적용된 class의 instance
      return boundFn;
    },
  };
  return adjDescriptor;
}
