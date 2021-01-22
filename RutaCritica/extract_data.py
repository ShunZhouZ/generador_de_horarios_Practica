# Probado con la oferta academica 2019-1

import numpy as np
import pandas as pd

#solo se consideran Catedra y Ayudantias, no Laboratorios
#ramos disponibles corresponde al codigo y no al nombre del curso



def equivalencia(ramos_disponibles, equivArray, excelArray):

	colum = equivArray[:,0]
	for aux in range(len(ramos_disponibles)):
		if ramos_disponibles[aux] not in excelArray[:,16]:
			if ramos_disponibles[aux] in equivArray:
				col = 0
				rows= np.where(colum==ramos_disponibles[aux])
				print(ramos_disponibles[aux], 'equivale a --->', equivArray[rows[0][0]][col], '\n')
				ramos_disponibles[aux] = equivArray[rows[0][0]][col+1]

	return ramos_disponibles



def readingExcels(nombreOferta, miMalla):

	excelArray = np.array(pd.read_excel(nombreOferta, sheet_name='Sheet1'))
	electivosArray = np.array(pd.read_excel(miMalla, sheet_name='Electivos'))
	equivArray = np.array(pd.read_excel(miMalla, sheet_name='Equivalencias'))
	miMallaArray = np.array(pd.read_excel('MiMalla.xlsx', sheet_name='MiMalla'))

	return excelArray, electivosArray, equivArray, miMallaArray



def extract_data(ramos_disponibles, miMalla,  ramos_disp_holgura, semestre, dict_ramos_codigos, sheet_name): 
	verificador = [0 for i in range(len(ramos_disponibles))] # se usa para saber que ramos no tienen horarios asigandos en la oferta academica

	#count_cfg= ramos_disponibles.count("CFG") #cuenta cuantos cfg se deben tomar 	
	lista_secciones=[]
	cod_elect_inf = []
	cod_elect_teleco = []
	cod_CFG = []


	#iteracion para guardar los electivos y cfgs no cursados, en arreglos separados
	for aux1 in range(len(ramos_disponibles)):

		if ramos_disponibles[aux1] == "CIT33XX":
			cod_elect_inf.append(ramos_disponibles[aux1])
		
		if ramos_disponibles[aux1] == "CIT34XX":
			cod_elect_teleco.append(ramos_disponibles[aux1])
		
		if ramos_disponibles[aux1] == "CFG":
			cod_CFG.append(ramos_disponibles[aux1])
		
	excelArray, electivosArray, equivArray, miMallaArray = readingExcels('INGENIERÍA-CIVIL-EN-INFORMÁTICA-Y-TELECOMUNICACIONES.xlsx', miMalla)

	ramosDisponibles = equivalencia(ramos_disponibles, equivArray, excelArray)


	#La idea para los electivos es que el alumno coloque en el Excel el electivo que ya curso, desde la sheet 'Electivos', y se filtra para no ofrecerle ese electivo.
	#Si los arreglos cod_elec_inf y cod_elect_teleco tienen elementos, se le ofrecerán los que no haya rendido. En cambio, si están vacios, quiere decir que ya dio esos electivos
	#y no se le ofreceran de ese tipo (teleco o inf)

	# Para los CFG se debe hacer algo similar con el arreglo cod_CFG, pero lo complicado es que son muchos CFG y el alumno no podrá indicar en el Excel cual ha cursado. Cuando se 
	# saque del portal será más facil. Igual es posible hacer un excel que entregue ordenados por categorias los CFG y asi el alumno podria ingresar facilmente el dato. 
	# Estudiar sobre esta posibilidad. 

	#En un ratito más codearé esto. Solucionar lo de los INGLÉS GENERAL. No los encuentra en los diccionarios de la oferta. Estudiar porque ocurre esto.

	#Si el semestre máximo aprobado por el alumno es mayor a 6, se le mostraran los electivos que se impartirán este semestre
	
	if semestre >= 6:
		codElectivos = electivosArray[:,1]
		codAprobados = miMallaArray[:,1]

		if len(cod_elect_inf) > 0: 				# <---- si el alumno aun debe dar electivos de informatica (el arreglo cod_elect_inf tiene elementos dentro)
			for i in range(1, len(codElectivos)):
				codigoAux = codElectivos[i]

				aux = codigoAux[0:5]
				if codigoAux not in codAprobados and aux == 'CIT33':
					ramosDisponibles.append(codElectivos[i])
		
		if len(cod_elect_teleco) > 0: 				# <---- si el alumno aun debe dar electivos de teleco(el arreglo cod_elect_inf tiene elementos dentro)
			for i in range(1, len(codElectivos)):
				codigoAux = codElectivos[i]

				aux = codigoAux[0:5]
				if codigoAux not in codAprobados and aux == 'CIT34':
					ramosDisponibles.append(codElectivos[i])
		#print(ramosDisponibles)

		ramsAux = ramosDisponibles

		for i in range(len(ramosDisponibles)):  #remuevo los codigos 33XX y 34XX que hayan en la lista de ramos, por un tema de comodidad
			
			if 'CIT33XX' in ramsAux:
				ramsAux.remove('CIT33XX')
			if 'CIT34XX' in ramsAux:
				ramsAux.remove('CIT34XX')
		
	nombres_ramos_tomar = {}
	for i in range (0,len(excelArray)):
		elem=excelArray[i]
		if isinstance(elem[21], str): 
			if elem[21][0] == "C": #se verifica que la informacion de la fila sea una Catedra
				aux_horario = [] 
				try:
					if len(elem[22].split()) == 5: #se procesa los datos de los horarios para usarlos posteriormente
						aux = elem[22].split()[0]+" "+elem[22].split()[2] # se guarda el primer modulo de la Catedra ejemplo LU 08.30
						aux_horario.append(aux)
						aux = elem[22].split()[1]+" "+elem[22].split()[2] # se guarda el segundo modulo de la Catedra ejemplo MA 10.00
						aux_horario.append(aux)

					codigo = elem[26]  
					codRamo = elem[16]
					nombre = elem[17]
					if len(elem[20]) == 10:
						seccion = int(elem[20][8]+elem[20][9])
					else:
						seccion = int(elem[20][8])
						
					profesor = elem[23]
				except:
					pass 
				finally:
					continue
			elif elem[21][0] == "A": #se verifica que la informacion de la fila sea una Ayudantia
				aux = elem[22].split()[0]+" "+elem[22].split()[1]  # se guarda el primer modulo de la ayudantia ejemplo VI 17.25
				aux_horario.append(aux)
			else:
				continue
		else:
			#aqui va en vez de nombre, codigo
			if codRamo in ramosDisponibles: #and (codRamo == dict_ramos_codigos[nombre] or nombre in auxiliarDeAseo): #con esto se guarda info incesaria en memoria, poquito la verdad
				#print(codRamo, nombre)
				aux33 = ramosDisponibles.index(codRamo)
				nombres_ramos_tomar[nombre] = nombre

				verificador[aux33] = 1
				alfa = {'codigo':codigo,'nombre':nombre, 'seccion':seccion, "horario":aux_horario, "profesor":profesor}
				aux_count = 0
				for k in range(0,len(lista_secciones)): 
					if lista_secciones[k]["codigo"] == codigo: # se verifica si ya existe esta seccion en la lista de secciones (se evitan datos repetidos)
						aux_count+=1
				if aux_count == 0: #con esto solo se agrega una vez la seccion
					lista_secciones.append(alfa)

	ramos_sin_horario =[]				
	for i in range(len(verificador)):
		if verificador[i] == 0:
			ramos_sin_horario.append(ramosDisponibles[i])

	""" for i in range(0,count_cfg):
		if count_cfg < 10:
			codigo = "CFG_0"+str(i+1)
			lista_secciones.append({'codigo':codigo,'nombre':"CFG-"+str(i+1), 'seccion':"Sección "+str(i+1), "horario":[codigo] ,"profesor": "CFG"})
		else:
			codigo = "CFG_"+str(i+1)
			lista_secciones.append({'codigo':codigo,'nombre':"CFG-"+str(i+1), 'seccion':"Sección "+str(i+1), "horario":[codigo] ,"profesor": "CFG"}) """
	#print(lista_secciones)

	#print(cod_elect_inf, cod_elect_teleco, cod_CFG)
	return lista_secciones ,ramos_sin_horario, ramos_disp_holgura, nombres_ramos_tomar




