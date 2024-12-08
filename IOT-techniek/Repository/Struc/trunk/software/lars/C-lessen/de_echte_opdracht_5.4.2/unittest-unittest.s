	.file	"unittest.c"
	.text
	.section	.rodata
.LC1:
	.string	"=="
.LC2:
	.string	"c == ROOD"
.LC3:
	.string	"unittest.c"
	.text
	.globl	test_1
	.type	test_1, @function
test_1:
.LFB279:
	.cfi_startproc
	endbr64
	pushq	%rbp
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	movq	%rsp, %rbp
	.cfi_def_cfa_register 6
	subq	$48, %rsp
	movsd	.LC0(%rip), %xmm0
	movsd	%xmm0, -16(%rbp)
	movw	$22, -8(%rbp)
	movb	$6, -6(%rbp)
	movq	-16(%rbp), %rdx
	movq	-8(%rbp), %rax
	movq	%rdx, %xmm0
	movq	%rax, %rdi
	call	waarschuwing@PLT
	movl	%eax, -36(%rbp)
	movl	-36(%rbp), %eax
	movq	%rax, -32(%rbp)
	movq	$0, -24(%rbp)
	movq	-32(%rbp), %rax
	cmpq	-24(%rbp), %rax
	je	.L3
	fildq	-24(%rbp)
	fildq	-32(%rbp)
	fxch	%st(1)
	subq	$8, %rsp
	pushq	$105
	leaq	-16(%rsp), %rsp
	fstpt	(%rsp)
	leaq	-16(%rsp), %rsp
	fstpt	(%rsp)
	leaq	.LC1(%rip), %r9
	leaq	.LC2(%rip), %r8
	leaq	__func__.4(%rip), %rax
	movq	%rax, %rcx
	movl	$8, %edx
	leaq	.LC3(%rip), %rax
	movq	%rax, %rsi
	movl	$0, %edi
	call	g_assertion_message_cmpnum@PLT
	addq	$48, %rsp
.L3:
	nop
	leave
	.cfi_def_cfa 7, 8
	ret
	.cfi_endproc
.LFE279:
	.size	test_1, .-test_1
	.section	.rodata
.LC6:
	.string	"c == GEEL"
	.text
	.globl	test_2
	.type	test_2, @function
test_2:
.LFB280:
	.cfi_startproc
	endbr64
	pushq	%rbp
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	movq	%rsp, %rbp
	.cfi_def_cfa_register 6
	subq	$48, %rsp
	movsd	.LC5(%rip), %xmm0
	movsd	%xmm0, -16(%rbp)
	movw	$42, -8(%rbp)
	movb	$2, -6(%rbp)
	movq	-16(%rbp), %rdx
	movq	-8(%rbp), %rax
	movq	%rdx, %xmm0
	movq	%rax, %rdi
	call	waarschuwing@PLT
	movl	%eax, -36(%rbp)
	movl	-36(%rbp), %eax
	movq	%rax, -32(%rbp)
	movq	$1, -24(%rbp)
	movq	-32(%rbp), %rax
	cmpq	-24(%rbp), %rax
	je	.L6
	fildq	-24(%rbp)
	fildq	-32(%rbp)
	fxch	%st(1)
	subq	$8, %rsp
	pushq	$105
	leaq	-16(%rsp), %rsp
	fstpt	(%rsp)
	leaq	-16(%rsp), %rsp
	fstpt	(%rsp)
	leaq	.LC1(%rip), %r9
	leaq	.LC6(%rip), %r8
	leaq	__func__.3(%rip), %rax
	movq	%rax, %rcx
	movl	$14, %edx
	leaq	.LC3(%rip), %rax
	movq	%rax, %rsi
	movl	$0, %edi
	call	g_assertion_message_cmpnum@PLT
	addq	$48, %rsp
.L6:
	nop
	leave
	.cfi_def_cfa 7, 8
	ret
	.cfi_endproc
.LFE280:
	.size	test_2, .-test_2
	.section	.rodata
.LC8:
	.string	"c == GROEN"
	.text
	.globl	test_3
	.type	test_3, @function
test_3:
.LFB281:
	.cfi_startproc
	endbr64
	pushq	%rbp
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	movq	%rsp, %rbp
	.cfi_def_cfa_register 6
	subq	$48, %rsp
	movsd	.LC7(%rip), %xmm0
	movsd	%xmm0, -16(%rbp)
	movw	$0, -8(%rbp)
	movb	$2, -6(%rbp)
	movq	-16(%rbp), %rdx
	movq	-8(%rbp), %rax
	movq	%rdx, %xmm0
	movq	%rax, %rdi
	call	waarschuwing@PLT
	movl	%eax, -36(%rbp)
	movl	-36(%rbp), %eax
	movq	%rax, -32(%rbp)
	movq	$2, -24(%rbp)
	movq	-32(%rbp), %rax
	cmpq	-24(%rbp), %rax
	je	.L9
	fildq	-24(%rbp)
	fildq	-32(%rbp)
	fxch	%st(1)
	subq	$8, %rsp
	pushq	$105
	leaq	-16(%rsp), %rsp
	fstpt	(%rsp)
	leaq	-16(%rsp), %rsp
	fstpt	(%rsp)
	leaq	.LC1(%rip), %r9
	leaq	.LC8(%rip), %r8
	leaq	__func__.2(%rip), %rax
	movq	%rax, %rcx
	movl	$19, %edx
	leaq	.LC3(%rip), %rax
	movq	%rax, %rsi
	movl	$0, %edi
	call	g_assertion_message_cmpnum@PLT
	addq	$48, %rsp
.L9:
	nop
	leave
	.cfi_def_cfa 7, 8
	ret
	.cfi_endproc
.LFE281:
	.size	test_3, .-test_3
	.section	.rodata
	.align 8
.LC9:
	.string	"!! Weeralarm: neerslag: 22 mm, temperatuur: 38.0 celsius, windkracht: 6\n"
	.text
	.globl	test_4
	.type	test_4, @function
test_4:
.LFB282:
	.cfi_startproc
	endbr64
	pushq	%rbp
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	movq	%rsp, %rbp
	.cfi_def_cfa_register 6
	subq	$32, %rsp
	movsd	.LC0(%rip), %xmm0
	movsd	%xmm0, -16(%rbp)
	movw	$22, -8(%rbp)
	movb	$6, -6(%rbp)
	movq	-16(%rbp), %rdx
	movq	-8(%rbp), %rax
	movq	%rdx, %xmm0
	movq	%rax, %rdi
	call	waarschuwing@PLT
	movl	%eax, -20(%rbp)
	call	g_test_subprocess@PLT
	testl	%eax, %eax
	je	.L11
	movq	-16(%rbp), %rcx
	movq	-8(%rbp), %rdx
	movl	-20(%rbp), %eax
	movq	%rcx, %xmm0
	movq	%rdx, %rsi
	movl	%eax, %edi
	call	bericht@PLT
	jmp	.L10
.L11:
	movl	$0, %edx
	movl	$0, %esi
	movl	$0, %edi
	call	g_test_trap_subprocess@PLT
	leaq	.LC9(%rip), %r9
	movl	$2, %r8d
	leaq	__func__.1(%rip), %rax
	movq	%rax, %rcx
	movl	$30, %edx
	leaq	.LC3(%rip), %rax
	movq	%rax, %rsi
	movl	$0, %edi
	call	g_test_trap_assertions@PLT
.L10:
	leave
	.cfi_def_cfa 7, 8
	ret
	.cfi_endproc
.LFE282:
	.size	test_4, .-test_4
	.section	.rodata
.LC11:
	.string	"sizeof(v.windkracht) == 1"
	.text
	.globl	test_5
	.type	test_5, @function
test_5:
.LFB283:
	.cfi_startproc
	endbr64
	pushq	%rbp
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	movq	%rsp, %rbp
	.cfi_def_cfa_register 6
	subq	$48, %rsp
	movb	$8, -33(%rbp)
	movsd	.LC10(%rip), %xmm0
	movsd	%xmm0, -16(%rbp)
	movw	$18, -8(%rbp)
	movzbl	-33(%rbp), %eax
	movb	%al, -6(%rbp)
	movq	$1, -32(%rbp)
	movq	$1, -24(%rbp)
	movq	-32(%rbp), %rax
	cmpq	-24(%rbp), %rax
	je	.L15
	fildq	-24(%rbp)
	fildq	-32(%rbp)
	fxch	%st(1)
	subq	$8, %rsp
	pushq	$105
	leaq	-16(%rsp), %rsp
	fstpt	(%rsp)
	leaq	-16(%rsp), %rsp
	fstpt	(%rsp)
	leaq	.LC1(%rip), %r9
	leaq	.LC11(%rip), %r8
	leaq	__func__.0(%rip), %rax
	movq	%rax, %rcx
	movl	$36, %edx
	leaq	.LC3(%rip), %rax
	movq	%rax, %rsi
	movl	$0, %edi
	call	g_assertion_message_cmpnum@PLT
	addq	$48, %rsp
.L15:
	nop
	leave
	.cfi_def_cfa 7, 8
	ret
	.cfi_endproc
.LFE283:
	.size	test_5, .-test_5
	.section	.rodata
.LC12:
	.string	"/test/1"
.LC13:
	.string	"/test/2"
.LC14:
	.string	"/test/3"
.LC15:
	.string	"/test/4"
.LC16:
	.string	"/test/5"
	.text
	.globl	main
	.type	main, @function
main:
.LFB284:
	.cfi_startproc
	endbr64
	pushq	%rbp
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	movq	%rsp, %rbp
	.cfi_def_cfa_register 6
	subq	$16, %rsp
	movl	%edi, -4(%rbp)
	movq	%rsi, -16(%rbp)
	leaq	-16(%rbp), %rcx
	leaq	-4(%rbp), %rax
	movl	$0, %edx
	movq	%rcx, %rsi
	movq	%rax, %rdi
	movl	$0, %eax
	call	g_test_init@PLT
	leaq	test_1(%rip), %rax
	movq	%rax, %rsi
	leaq	.LC12(%rip), %rax
	movq	%rax, %rdi
	call	g_test_add_func@PLT
	leaq	test_2(%rip), %rax
	movq	%rax, %rsi
	leaq	.LC13(%rip), %rax
	movq	%rax, %rdi
	call	g_test_add_func@PLT
	leaq	test_3(%rip), %rax
	movq	%rax, %rsi
	leaq	.LC14(%rip), %rax
	movq	%rax, %rdi
	call	g_test_add_func@PLT
	leaq	test_4(%rip), %rax
	movq	%rax, %rsi
	leaq	.LC15(%rip), %rax
	movq	%rax, %rdi
	call	g_test_add_func@PLT
	leaq	test_5(%rip), %rax
	movq	%rax, %rsi
	leaq	.LC16(%rip), %rax
	movq	%rax, %rdi
	call	g_test_add_func@PLT
	call	g_test_run@PLT
	leave
	.cfi_def_cfa 7, 8
	ret
	.cfi_endproc
.LFE284:
	.size	main, .-main
	.section	.rodata
	.type	__func__.4, @object
	.size	__func__.4, 7
__func__.4:
	.string	"test_1"
	.type	__func__.3, @object
	.size	__func__.3, 7
__func__.3:
	.string	"test_2"
	.type	__func__.2, @object
	.size	__func__.2, 7
__func__.2:
	.string	"test_3"
	.type	__func__.1, @object
	.size	__func__.1, 7
__func__.1:
	.string	"test_4"
	.type	__func__.0, @object
	.size	__func__.0, 7
__func__.0:
	.string	"test_5"
	.align 8
.LC0:
	.long	0
	.long	1078132736
	.align 8
.LC5:
	.long	0
	.long	1077018624
	.align 8
.LC7:
	.long	0
	.long	1077477376
	.align 8
.LC10:
	.long	0
	.long	1076887552
	.ident	"GCC: (Ubuntu 11.4.0-1ubuntu1~22.04) 11.4.0"
	.section	.note.GNU-stack,"",@progbits
	.section	.note.gnu.property,"a"
	.align 8
	.long	1f - 0f
	.long	4f - 1f
	.long	5
0:
	.string	"GNU"
1:
	.align 8
	.long	0xc0000002
	.long	3f - 2f
2:
	.long	0x3
3:
	.align 8
4:
