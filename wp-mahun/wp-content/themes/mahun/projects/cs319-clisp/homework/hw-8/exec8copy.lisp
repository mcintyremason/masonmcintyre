;; Functions to execute statements for imp1.

;; Environment functions. The environment is an association
;; list.

;; lval-lookup: Look up the lvalue of a variable which is
;; the sublist in the environment that contains the variable.
;; Returns nil if the variable is undefined.
(defun lval-lookup (var env)
  (assoc var env))

;; rval-lookup: Loop up the rvalue of a variable. If the variable
;; is undefined, returns nil.
(defun rval-lookup (var env)
  (let ((lval (lval-lookup var env)))
    (if (null lval) 
	nil
      (cadr lval))))

;; Assign a value to a variable. Returns the new environment.
(defun assign (var val env)
  (let ((lval (lval-lookup var env)))
    (if (null lval)
	(cons (list var val) env)
      (progn
	(setf (cadr lval) val)
	env))))

;; exec-stmt-list: Execute a list of statements.
(defun exec-stmt-list (stmts env)
  (if (null stmts)
      env
    ;; Execute the first statement.
    (let ((new-env (exec-stmt (car stmts) env)))
      ;; Execute the remaining statements in the
      ;; environment resulting from execution of
      ;; the first statement.
      (exec-stmt-list (cdr stmts) new-env))))

;; Construct a format string for a write statement.
(defun make-write-format (expr env)
  (if (null expr)
      "~8D"
    (format nil "~~~aD" (eval-expr expr env))))

;; Construct a format string for a writeln statement.
(defun make-writeln-format (expr env)
  (if (null expr)
      "~8D~%"
    (format nil "~~~aD~~%" (eval-expr expr env))))

;; exec-stmt: Execute a single statement.
(defun exec-stmt (stmt env)
  (etypecase 
   stmt
   (write-stmt (progn
                 (format *standard-output* 
                         (make-write-format (write-stmt-width stmt) env)
                         (eval-expr (write-stmt-arg stmt) env))
                 env))
   (writeln-stmt (if (null (writeln-stmt-arg stmt))
                     (progn (format *standard-output* "~%") env)
                   (progn (format *standard-output* 
                                  (make-writeln-format (writeln-stmt-width stmt) env)
                                  (eval-expr (writeln-stmt-arg stmt) env)))))
   (assign-stmt (assign (assign-stmt-lval stmt)
			(eval-expr (assign-stmt-rval stmt) env) env))
   (if-stmt (if (eq (eval-expr (if-stmt-test stmt) env) 'TRUE)
		(exec-stmt (if-stmt-body stmt) env)
	      env))
   (if-else-stmt (if (eq (eval-expr (if-else-stmt-test stmt) env) 'TRUE)
		     (exec-stmt (if-else-stmt-if-part stmt) env)
		   (exec-stmt (if-else-stmt-else-part stmt) env)))
   (cmpd-stmt (exec-stmt-list (cmpd-stmt-stmts stmt) env))
   (while-stmt (if (eq (eval-expr (while-stmt-test stmt) env) 'TRUE)
                   ;; Execute the body, yielding a new environment.
                   (let ((new-env (exec-stmt (while-stmt-body stmt) env)))
                     ;; Execute the while again, using the new environment.
                     (exec-stmt stmt new-env))
		 env))
   (for-stmt 
(progn
    (let ((new-env (assign (for-stmt-control stmt) (for-stmt-lbound stmt) env)))
      ;; Set control in a and return new environment
    ;(let ((new-env (assign (for-stmt-control stmt) (eval-expr (for-stmt-lbound stmt) env) env)))
      ;(if (< (rval-lookup (for-stmt-control stmt) new-env) (eval-expr (for-stmt-ubound stmt) new-env))
        ;; Call helper function to recursively call itself until the control lval equals the upper bound
        (exec-for-stmt (rval-lookup (for-stmt-control stmt) new-env) (for-stmt-body stmt) (eval-expr (for-stmt-ubound stmt) new-env) new-env))))
      ;new-env))))
   (empty-stmt env)))


;; exec-program: Execute the program.
(defun exec-program (prog env)
  (exec-stmt-list (program-stmts prog) env))

(defun exec-for-stmt(body control upper-bound env)
  (if (< control upper-bound)
      (progn
        (exec-stmt body env)
        (exec-for-stmt body (+ control 1) upper-bound env))
    env)
)

(defun exec-for-h (stmt env)
  (if (< (rval-lookup (for-stmt-control stmt) env) (eval-expr (for-stmt-ubound stmt) env))
      (progn
        (exec-stmt (for-stmt-body stmt) env)
        (setf (cadr (lval-lookup (for-stmt-control stmt) env)) (+ (rval-lookup (for-stmt-control stmt) env) 1))
        (exec-for-h stmt env))
    env)
)

(defun split (str delim)
  (labels ((splith (chars delims word words)
                 (if (null chars) (cons word words)
                   (if (member (car chars) delims) (splith (cdr chars) delims nil (cons word words))
                     (splith (cdr chars) delims (cons (car chars) word) words)))))
          (funcall #'reverse (mapcar (lambda (lst) (reverse lst)) (splith (coerce st\
r 'list) (coerce delim 'list) () ())))))
