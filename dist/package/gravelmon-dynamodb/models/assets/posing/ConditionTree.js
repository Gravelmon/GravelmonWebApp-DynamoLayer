"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeExpression = serializeExpression;
exports.deserializeExpression = deserializeExpression;
function serializeExpression(node) {
    switch (node.type) {
        case 'logical':
            return {
                type: 'logical',
                operator: node.operator,
                left: serializeExpression(node.left),
                right: serializeExpression(node.right),
            };
        case 'comparison':
            return {
                type: 'comparison',
                operator: node.operator,
                left: serializeExpression(node.left),
                right: serializeExpression(node.right),
            };
        case 'ternary':
            return {
                type: 'ternary',
                condition: serializeExpression(node.condition),
                ifTrue: serializeExpression(node.ifTrue),
                ifFalse: serializeExpression(node.ifFalse),
            };
        case 'query':
            return {
                type: 'query',
                query: node.query,
                args: node.args.map(serializeExpression),
            };
        case 'not':
            return {
                type: 'not',
                value: serializeExpression(node.operand)
            };
        case 'literal':
            return {
                type: 'literal',
                value: node.value,
            };
        case 'boolean':
            return {
                type: 'boolean',
                value: node.value,
            };
    }
}
function deserializeExpression(data) {
    console.log(data);
    switch (data.type) {
        case 'logical':
            return {
                type: 'logical',
                operator: data.operator,
                left: deserializeExpression(data.left),
                right: deserializeExpression(data.right),
            };
        case 'comparison':
            return {
                type: 'comparison',
                operator: data.operator,
                left: deserializeExpression(data.left),
                right: deserializeExpression(data.right),
            };
        case 'ternary':
            return {
                type: 'ternary',
                condition: deserializeExpression(data.condition),
                ifTrue: deserializeExpression(data.ifTrue),
                ifFalse: deserializeExpression(data.ifFalse),
            };
        case 'not':
            return {
                type: 'not',
                operand: deserializeExpression(data.operand),
            };
        case 'query':
            return {
                type: 'query',
                query: data.query,
                args: (data.args ?? []).map(deserializeExpression),
            };
        case 'literal':
            return {
                type: 'literal',
                value: data.value,
            };
        case 'boolean':
            return {
                type: 'boolean',
                value: data.value,
            };
        default:
            throw new Error(`Unknown ExpressionNode type: ${data.type}`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZGl0aW9uVHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9ncmF2ZWxtb24tZHluYW1vZGIvbW9kZWxzL2Fzc2V0cy9wb3NpbmcvQ29uZGl0aW9uVHJlZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQThEQSxrREFtREM7QUFFRCxzREF1REM7QUE1R0QsU0FBZ0IsbUJBQW1CLENBQUMsSUFBb0I7SUFDcEQsUUFBUSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsS0FBSyxTQUFTO1lBQ1YsT0FBTztnQkFDSCxJQUFJLEVBQUUsU0FBUztnQkFDZixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3ZCLElBQUksRUFBRSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNwQyxLQUFLLEVBQUUsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzthQUN6QyxDQUFDO1FBRU4sS0FBSyxZQUFZO1lBQ2IsT0FBTztnQkFDSCxJQUFJLEVBQUUsWUFBWTtnQkFDbEIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUN2QixJQUFJLEVBQUUsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDcEMsS0FBSyxFQUFFLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7YUFDekMsQ0FBQztRQUVOLEtBQUssU0FBUztZQUNWLE9BQU87Z0JBQ0gsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsU0FBUyxFQUFFLG1CQUFtQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQzlDLE1BQU0sRUFBRSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUN4QyxPQUFPLEVBQUUsbUJBQW1CLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzthQUM3QyxDQUFDO1FBRU4sS0FBSyxPQUFPO1lBQ1IsT0FBTztnQkFDSCxJQUFJLEVBQUUsT0FBTztnQkFDYixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQ2pCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQzthQUMzQyxDQUFDO1FBRU4sS0FBSyxLQUFLO1lBQ04sT0FBTztnQkFDSCxJQUFJLEVBQUUsS0FBSztnQkFDWCxLQUFLLEVBQUUsbUJBQW1CLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzthQUMzQyxDQUFDO1FBRU4sS0FBSyxTQUFTO1lBQ1YsT0FBTztnQkFDSCxJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7YUFDcEIsQ0FBQztRQUVOLEtBQUssU0FBUztZQUNWLE9BQU87Z0JBQ0gsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2FBQ3BCLENBQUM7SUFDVixDQUFDO0FBQ0wsQ0FBQztBQUVELFNBQWdCLHFCQUFxQixDQUFDLElBQVM7SUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQixRQUFRLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQixLQUFLLFNBQVM7WUFDVixPQUFPO2dCQUNILElBQUksRUFBRSxTQUFTO2dCQUNmLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtnQkFDdkIsSUFBSSxFQUFFLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ3RDLEtBQUssRUFBRSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2FBQzNDLENBQUM7UUFFTixLQUFLLFlBQVk7WUFDYixPQUFPO2dCQUNILElBQUksRUFBRSxZQUFZO2dCQUNsQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3ZCLElBQUksRUFBRSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUN0QyxLQUFLLEVBQUUscUJBQXFCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzthQUMzQyxDQUFDO1FBRU4sS0FBSyxTQUFTO1lBQ1YsT0FBTztnQkFDSCxJQUFJLEVBQUUsU0FBUztnQkFDZixTQUFTLEVBQUUscUJBQXFCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFDaEQsTUFBTSxFQUFFLHFCQUFxQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQzFDLE9BQU8sRUFBRSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2FBQy9DLENBQUM7UUFFTixLQUFLLEtBQUs7WUFDTixPQUFPO2dCQUNILElBQUksRUFBRSxLQUFLO2dCQUNYLE9BQU8sRUFBRSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2FBQy9DLENBQUM7UUFFTixLQUFLLE9BQU87WUFDUixPQUFPO2dCQUNILElBQUksRUFBRSxPQUFPO2dCQUNiLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztnQkFDakIsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUM7YUFDckQsQ0FBQztRQUVOLEtBQUssU0FBUztZQUNWLE9BQU87Z0JBQ0gsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2FBQ3BCLENBQUM7UUFFTixLQUFLLFNBQVM7WUFDVixPQUFPO2dCQUNILElBQUksRUFBRSxTQUFTO2dCQUNmLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSzthQUNwQixDQUFDO1FBRU47WUFDSSxNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNyRSxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB0eXBlIEV4cHJlc3Npb25Ob2RlID1cclxuICAgIHwgTG9naWNhbE5vZGVcclxuICAgIHwgQ29tcGFyaXNvbk5vZGVcclxuICAgIHwgUXVlcnlOb2RlXHJcbiAgICB8IExpdGVyYWxOb2RlXHJcbiAgICB8IFRlcm5hcnlOb2RlXHJcbiAgICB8IE5vdE5vZGVcclxuICAgIHwgQm9vbGVhbk5vZGU7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFF1ZXJ5Tm9kZSB7XHJcbiAgICB0eXBlOiAncXVlcnknO1xyXG5cclxuICAgIHF1ZXJ5OiBzdHJpbmc7XHJcbiAgICBhcmdzOiBFeHByZXNzaW9uTm9kZVtdO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRlcm5hcnlOb2RlIHtcclxuICAgIHR5cGU6ICd0ZXJuYXJ5JztcclxuXHJcbiAgICBjb25kaXRpb246IEV4cHJlc3Npb25Ob2RlO1xyXG4gICAgaWZUcnVlOiBFeHByZXNzaW9uTm9kZTtcclxuICAgIGlmRmFsc2U6IEV4cHJlc3Npb25Ob2RlO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExpdGVyYWxOb2RlIHtcclxuICAgIHR5cGU6ICdsaXRlcmFsJztcclxuXHJcbiAgICB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE5vdE5vZGUge1xyXG4gICAgdHlwZTogJ25vdCc7XHJcbiAgICBvcGVyYW5kOiBFeHByZXNzaW9uTm9kZTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBCb29sZWFuTm9kZSB7XHJcbiAgICB0eXBlOiAnYm9vbGVhbic7XHJcblxyXG4gICAgdmFsdWU6IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29tcGFyaXNvbk5vZGUge1xyXG4gICAgdHlwZTogJ2NvbXBhcmlzb24nO1xyXG4gICAgb3BlcmF0b3I6XHJcbiAgICAgICAgfCAnPT0nXHJcbiAgICAgICAgfCAnIT0nXHJcbiAgICAgICAgfCAnPidcclxuICAgICAgICB8ICc+PSdcclxuICAgICAgICB8ICc8J1xyXG4gICAgICAgIHwgJzw9JztcclxuXHJcbiAgICBsZWZ0OiBFeHByZXNzaW9uTm9kZTtcclxuICAgIHJpZ2h0OiBFeHByZXNzaW9uTm9kZTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBMb2dpY2FsTm9kZSB7XHJcbiAgICB0eXBlOiAnbG9naWNhbCc7XHJcbiAgICBvcGVyYXRvcjogJyYmJyB8ICd8fCc7XHJcbiAgICBsZWZ0OiBFeHByZXNzaW9uTm9kZTtcclxuICAgIHJpZ2h0OiBFeHByZXNzaW9uTm9kZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGl6ZUV4cHJlc3Npb24obm9kZTogRXhwcmVzc2lvbk5vZGUpOiBhbnkge1xyXG4gICAgc3dpdGNoIChub2RlLnR5cGUpIHtcclxuICAgICAgICBjYXNlICdsb2dpY2FsJzpcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdsb2dpY2FsJyxcclxuICAgICAgICAgICAgICAgIG9wZXJhdG9yOiBub2RlLm9wZXJhdG9yLFxyXG4gICAgICAgICAgICAgICAgbGVmdDogc2VyaWFsaXplRXhwcmVzc2lvbihub2RlLmxlZnQpLFxyXG4gICAgICAgICAgICAgICAgcmlnaHQ6IHNlcmlhbGl6ZUV4cHJlc3Npb24obm9kZS5yaWdodCksXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGNhc2UgJ2NvbXBhcmlzb24nOlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2NvbXBhcmlzb24nLFxyXG4gICAgICAgICAgICAgICAgb3BlcmF0b3I6IG5vZGUub3BlcmF0b3IsXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiBzZXJpYWxpemVFeHByZXNzaW9uKG5vZGUubGVmdCksXHJcbiAgICAgICAgICAgICAgICByaWdodDogc2VyaWFsaXplRXhwcmVzc2lvbihub2RlLnJpZ2h0KSxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY2FzZSAndGVybmFyeSc6XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAndGVybmFyeScsXHJcbiAgICAgICAgICAgICAgICBjb25kaXRpb246IHNlcmlhbGl6ZUV4cHJlc3Npb24obm9kZS5jb25kaXRpb24pLFxyXG4gICAgICAgICAgICAgICAgaWZUcnVlOiBzZXJpYWxpemVFeHByZXNzaW9uKG5vZGUuaWZUcnVlKSxcclxuICAgICAgICAgICAgICAgIGlmRmFsc2U6IHNlcmlhbGl6ZUV4cHJlc3Npb24obm9kZS5pZkZhbHNlKSxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY2FzZSAncXVlcnknOlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ3F1ZXJ5JyxcclxuICAgICAgICAgICAgICAgIHF1ZXJ5OiBub2RlLnF1ZXJ5LFxyXG4gICAgICAgICAgICAgICAgYXJnczogbm9kZS5hcmdzLm1hcChzZXJpYWxpemVFeHByZXNzaW9uKSxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY2FzZSAnbm90JzpcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdub3QnLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IHNlcmlhbGl6ZUV4cHJlc3Npb24obm9kZS5vcGVyYW5kKVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYXNlICdsaXRlcmFsJzpcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdsaXRlcmFsJyxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBub2RlLnZhbHVlLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYXNlICdib29sZWFuJzpcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdib29sZWFuJyxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBub2RlLnZhbHVlLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGVzZXJpYWxpemVFeHByZXNzaW9uKGRhdGE6IGFueSk6IEV4cHJlc3Npb25Ob2RlIHtcclxuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgc3dpdGNoIChkYXRhLnR5cGUpIHtcclxuICAgICAgICBjYXNlICdsb2dpY2FsJzpcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdsb2dpY2FsJyxcclxuICAgICAgICAgICAgICAgIG9wZXJhdG9yOiBkYXRhLm9wZXJhdG9yLFxyXG4gICAgICAgICAgICAgICAgbGVmdDogZGVzZXJpYWxpemVFeHByZXNzaW9uKGRhdGEubGVmdCksXHJcbiAgICAgICAgICAgICAgICByaWdodDogZGVzZXJpYWxpemVFeHByZXNzaW9uKGRhdGEucmlnaHQpLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYXNlICdjb21wYXJpc29uJzpcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdjb21wYXJpc29uJyxcclxuICAgICAgICAgICAgICAgIG9wZXJhdG9yOiBkYXRhLm9wZXJhdG9yLFxyXG4gICAgICAgICAgICAgICAgbGVmdDogZGVzZXJpYWxpemVFeHByZXNzaW9uKGRhdGEubGVmdCksXHJcbiAgICAgICAgICAgICAgICByaWdodDogZGVzZXJpYWxpemVFeHByZXNzaW9uKGRhdGEucmlnaHQpLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYXNlICd0ZXJuYXJ5JzpcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICd0ZXJuYXJ5JyxcclxuICAgICAgICAgICAgICAgIGNvbmRpdGlvbjogZGVzZXJpYWxpemVFeHByZXNzaW9uKGRhdGEuY29uZGl0aW9uKSxcclxuICAgICAgICAgICAgICAgIGlmVHJ1ZTogZGVzZXJpYWxpemVFeHByZXNzaW9uKGRhdGEuaWZUcnVlKSxcclxuICAgICAgICAgICAgICAgIGlmRmFsc2U6IGRlc2VyaWFsaXplRXhwcmVzc2lvbihkYXRhLmlmRmFsc2UpLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYXNlICdub3QnOlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ25vdCcsXHJcbiAgICAgICAgICAgICAgICBvcGVyYW5kOiBkZXNlcmlhbGl6ZUV4cHJlc3Npb24oZGF0YS5vcGVyYW5kKSxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY2FzZSAncXVlcnknOlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ3F1ZXJ5JyxcclxuICAgICAgICAgICAgICAgIHF1ZXJ5OiBkYXRhLnF1ZXJ5LFxyXG4gICAgICAgICAgICAgICAgYXJnczogKGRhdGEuYXJncyA/PyBbXSkubWFwKGRlc2VyaWFsaXplRXhwcmVzc2lvbiksXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGNhc2UgJ2xpdGVyYWwnOlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2xpdGVyYWwnLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEudmFsdWUsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEudmFsdWUsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBFeHByZXNzaW9uTm9kZSB0eXBlOiAke2RhdGEudHlwZX1gKTtcclxuICAgIH1cclxufSJdfQ==