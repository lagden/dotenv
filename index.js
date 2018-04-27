/**
 * Módulo dotenv
 * @module index
 */

'use strict'

const {resolve} = require('path')
const {createReadStream, readFileSync} = require('fs')
const readline = require('readline')
const debug = require('@tadashi/debug')('tadashi-dotenv')

/**
 * Helper resolve o arquivo
 * @private
 *
 * @returns {string} caminho do arquivo
 */
function _prepare(...args) {
	const [file = '.env', _path = process.cwd()] = args
	const dotenvFile = resolve(_path, file)
	return dotenvFile
}

/**
 * Helper faz o parse da linha e registra no process.env
 * @private
 *
 */
function _parse(line) {
	const [k, v] = line.split('=')
	process.env[k] = v
}

/**
 * Helper exibe a mensagem de sucesso (somente no DEBUG MODE)
 * @private
 *
 */
function _complete() {
	debug.log('.env processed')
}

/**
 * Faz a leitura do .env no modo stream
 *
 * @param {string} [file=.env]            - Nome do arquivo
 * @param {string} [_path=process.cwd()]  - Caminho do arquivo
 * @returns {Class} fs.ReadStream
 */
function streamEnv(...args) {
	const dotenvFile = _prepare(...args)
	const input = createReadStream(dotenvFile)
	input
		.on('open', () => {
			readline
				.createInterface({input, crlfDelay: Infinity})
				.on('line', _parse)
				.on('close', _complete)
		})

	return input
}

/**
 * Faz a leitura do .env no modo sync
 *
 * @param {string} [file=.env]            - Nome do arquivo
 * @param {string} [_path=process.cwd()]  - Caminho do arquivo
 * @returns {boolean} true
 * @throws {Error}
 */
function syncEnv(...args) {
	const dotenvFile = _prepare(...args)
	const input = readFileSync(dotenvFile, 'utf-8')
	const lines = input.split(/\n|\n\r/g)
	for (const line of lines) {
		_parse(line)
	}
	_complete()
	return true
}

exports.streamEnv = streamEnv
exports.syncEnv = syncEnv
