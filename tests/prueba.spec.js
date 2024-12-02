function sumar(num1, num2) {
  return num1 + num2;
}
describe("Pruebas para la funcion sumar", () => {
  it("deberia devolver la suma de los dos numeros", () => {
    const result = sumar(4, 5);
    expect(result).toBe(9);
    // Añadir más pruebas aquí
    expect(sumar(4, 3)).toBe(7);
  });
});
