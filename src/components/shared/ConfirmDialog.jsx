import './ConfirmDialog.css';

function ConfirmDialog({
  open,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  confirmVariant = 'primary',
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="confirm-dialog-overlay" role="dialog" aria-modal="true">
      <div className="confirm-dialog-card">
        <div className="confirm-dialog-header">
          <h2>{title}</h2>
          <p>{message}</p>
        </div>
        <div className="confirm-dialog-actions">
          <button type="button" className="confirm-dialog__cancel" onClick={onCancel}>
            {cancelText}
          </button>
          <button
            type="button"
            className={`confirm-dialog__confirm confirm-dialog__confirm--${confirmVariant}`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
