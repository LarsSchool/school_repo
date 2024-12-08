	.file	"weer.c"
	.text
	.globl	waarschuwing
	.type	waarschuwing, @function
waarschuwing:
.LFB0:
	.cfi_startproc
	endbr64
	pushq	%rbp
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	movq	%rsp, %rbp
	.cfi_def_cfa_register 6
	movq	%xmm0, %rsi
	movq	%rdi, %rcx
	movl	$0, %eax
	movl	$0, %edx
	movq	%rsi, %rax
	movq	%rcx, %rdx
	movq	%rax, -16(%rbp)
	movq	%rdx, -8(%rbp)
	movzwl	-8(%rbp), %eax
	cmpw	$80, %ax
	jg	.L2
	movsd	-16(%rbp), %xmm0
	comisd	.LC0(%rip), %xmm0
	ja	.L2
	movsd	-16(%rbp), %xmm1
	movsd	.LC1(%rip), %xmm0
	comisd	%xmm1, %xmm0
	ja	.L2
	movzbl	-6(%rbp), %eax
	cmpb	$8, %al
	jle	.L3
.L2:
	movl	$0, %eax
	jmp	.L4
.L3:
	movzwl	-8(%rbp), %eax
	cmpw	$30, %ax
	jg	.L5
	movsd	-16(%rbp), %xmm0
	comisd	.LC2(%rip), %xmm0
	ja	.L5
	movsd	-16(%rbp), %xmm1
	movsd	.LC3(%rip), %xmm0
	comisd	%xmm1, %xmm0
	ja	.L5
	movzbl	-6(%rbp), %eax
	cmpb	$5, %al
	jle	.L6
.L5:
	movl	$1, %eax
	jmp	.L4
.L6:
	movl	$2, %eax
.L4:
	popq	%rbp
	.cfi_def_cfa 7, 8
	ret
	.cfi_endproc
.LFE0:
	.size	waarschuwing, .-waarschuwing
	.section	.rodata
	.align 8
.LC4:
	.string	"!! Weeralarm: neerslag: %i mm, temperatuur: %f celcius, windkracht: %i\n"
	.text
	.globl	bericht
	.type	bericht, @function
bericht:
.LFB1:
	.cfi_startproc
	endbr64
	pushq	%rbp
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	movq	%rsp, %rbp
	.cfi_def_cfa_register 6
	subq	$32, %rsp
	movl	%edi, -4(%rbp)
	movq	%xmm0, %rdi
	movq	%rsi, %rcx
	movl	$0, %eax
	movl	$0, %edx
	movq	%rdi, %rax
	movq	%rcx, %rdx
	movq	%rax, -32(%rbp)
	movq	%rdx, -24(%rbp)
	movzbl	-22(%rbp), %eax
	movsbl	%al, %edx
	movq	-32(%rbp), %rcx
	movzwl	-24(%rbp), %eax
	cwtl
	movq	%rcx, %xmm0
	movl	%eax, %esi
	leaq	.LC4(%rip), %rax
	movq	%rax, %rdi
	movl	$1, %eax
	call	printf@PLT
	nop
	leave
	.cfi_def_cfa 7, 8
	ret
	.cfi_endproc
.LFE1:
	.size	bericht, .-bericht
	.section	.rodata
	.align 8
.LC0:
	.long	0
	.long	1078034432
	.align 8
.LC1:
	.long	0
	.long	-1070727168
	.align 8
.LC2:
	.long	0
	.long	1077805056
	.align 8
.LC3:
	.long	0
	.long	-1071382528
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
