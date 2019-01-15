/**
 * Módulo dotenv
 * @module index
 */

'use strict'

const {resolve} = require('path')
const {readFileSync, statSync} = require('fs')

/**
 * Helper para verificar se o arquivo existe
 *
 * @param {string} file                   - Caminho completo do arquivo
 * @returns {boolean} true | false
 */
function _verify(file) {
	try	{
		const stats = statSync(file)
		return stats.isFile()
	} catch (error) {
		return false
	}
}

/**
 * Helper resolve o arquivo
 * @private
 *
 * @returns {string} caminho do arquivo
 */
function _prepare(...args) {
	const [_file = '.env', _path = process.cwd()] = args
	const file = resolve(_path, _file)
	return file
}

/**
 * Helper faz o parse da linha e registra no process.env
 * @private
 * @param {string} line - Linha do arquivo
 *
 * @returns {void}
 */
function _parse(line) {
	const [k, ...v] = line.split('=')
	process.env[k] = v.join('=')
}

/**
 * Faz a leitura do .env
 *
 * @param {string} [file=.env]            - Nome do arquivo
 * @param {string} [_path=process.cwd()]  - Caminho do arquivo
 * @returns {boolean} true
 * @throws {Error}
 */
function dotEnv(...args) {
	const file = _prepare(...args)
	if (_verify(file) === false) {
		throw new Error(`File not found: ${file}`)
	}

	const data = readFileSync(file, 'utf8')
	const lines = data.split(/\n|\r\n/g)
	for (const line of lines) {
		_parse(line)
	}

	return true
}

module.exports = dotEnv
