package java.utils;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Optional;

/**
 * Custom function-like interface to clean up commands layout.
 */
interface Command {
    void execute();
    void undo();
}

/**
 * Execution engine based on the Command pattern with Undo/Redo historical control capabilities.
 * Designed to isolate business logic changes and modular operations cleanly.
 * 
 * @author BorjaD-Dev (Teal Wolf Studios)
 * @version 1.0.0
 */
public class CommandQueueExecutor {

    /**
     * History stack containing executed actions ready to be undone.
     */
    private final Deque<Command> executionHistory = new ArrayDeque<>();

    /**
     * History stack containing undone actions ready to be redone.
     */
    private final Deque<Command> redoHistory = new ArrayDeque<>();

    /**
     * Enqueues and triggers a single transaction command immediately.
     * Clears out the redo stack sequence once a new action takes place.
     * 
     * @param command Non-null generic command instance to execute.
     * @throws IllegalArgumentException if the provided command parameter is null.
     */
    public void executeCommand(Command command) {
        if (command == null) {
            throw new IllegalArgumentException("[CommandQueueExecutor] Command structure cannot be null.");
        }

        command.execute();
        executionHistory.push(command);
        redoHistory.clear(); 
    }

    /**
     * Rolls back the last executed operation from the active execution track stack.
     * Moves the command safely over to the redo history tracker.
     */
    public void undoLastAction() {
        if (executionHistory.isEmpty()) return;

        Command lastCommand = executionHistory.pop();
        lastCommand.undo();
        redoHistory.push(lastCommand);
    }

    /**
     * Re-executes the last reverted operation from the redo stack sequence.
     * Re-pushes the command back into the primary historical register block.
     */
    public void redoLastAction() {
        if (redoHistory.isEmpty()) return;

        Command deadCommand = redoHistory.pop();
        deadCommand.execute();
        executionHistory.push(deadCommand);
    }

    /**
     * Safely checks the current execution stack depth size.
     * 
     * @return current active tracking execution size metrics value.
     */
    public int getHistorySize() {
        return executionHistory.size();
    }

    /**
     * Flushes out all stored command references to clean up allocation overheads.
     */
    public void reset() {
        executionHistory.clear();
        redoHistory.clear();
    }
}
