'use strict'

import process from 'process'
import {join} from 'path'
import test from 'ava'
import dotEnv from '..'

test.beforeEach(() => {
	process.env = {}
})

test('.env', t => {
	const r = dotEnv()
	t.true(r)
	t.is(process.env.DEBUG, 'tadashi-dotenv')
	t.is(process.env.DOTENV, 'awesome')
	t.is(process.env.MONGODB, 'mongodb://lagden:123@127.0.0.1:27017/?authSource=admin')
})

test('.env error', t => {
	const error = t.throws(() => {
		dotEnv('not_found', '/tmp')
	}, Error)
	t.is(error.message, 'File not found: /tmp/not_found')
})

test('.env crlf', t => {
	const r = dotEnv('env.crlf', join(__dirname, 'fixtures'))
	t.true(r)
	t.is(process.env.DEBUG, 'tadashi-dotenv')
	t.is(process.env.DOTENV, 'awesome')
	t.is(process.env.WIN, 'crlf')
})
