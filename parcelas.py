import math

def r(n):
  return str(round(n, 2))

def calc_taxa(nro_parcelas, parcela_inicial, parcela_final):
    taxa = parcela_inicial / parcela_final
    taxa = math.log(taxa) / (nro_parcelas-1)
    return math.exp(taxa)

def prever(nro_parcelas, parcela_inicial, parcela_final):
    # taxa = 1.074082165
    taxa = calc_taxa(nro_parcelas, parcela_inicial, parcela_final)
    parcela_seguinte = parcela_inicial
    pagaria = parcela_inicial * nro_parcelas
    paga_antecipado = 0
    for i in range(nro_parcelas):
        paga_antecipado += parcela_seguinte
        parcela_seguinte /= taxa
  
    economiza = pagaria-paga_antecipado
    print("taxa " + str(taxa))
    print("pagaria " + r(pagaria))
    print("paga_antecipado " + r(paga_antecipado))
    print("economiza " + r(pagaria-paga_antecipado))

    return pagaria, paga_antecipado, economiza

p1,a1,e1 = prever(34, 81.71, 7.73)
print("------------------")
p2,a2,e2 = prever(50, 34.83, 12.51)

# print(calc_taxa(81.71, 7.73, 33))

