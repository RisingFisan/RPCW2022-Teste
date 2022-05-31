import json

with open("mapa.json") as f:
    j = json.load(f)

cidades = j['cidades']
for cidade in cidades:
    cidade['_id'] = cidade.pop('id')

with open("cidades.json", "w") as f:
    json.dump(cidades, f, indent=2, ensure_ascii=False)

ligacoes = j['ligações']
for ligacao in ligacoes:
    ligacao['_id'] = ligacao.pop('id')

with open("ligacoes.json", "w") as f:
    json.dump(ligacoes, f, indent=2, ensure_ascii=False)